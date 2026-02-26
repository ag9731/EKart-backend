const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config;
var cookie = require("cookie");

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, role, email, phone, address, password } =
      req.body;
    const saltRounds = 10;

    if (
      !firstName ||
      !lastName ||
      !role ||
      !email ||
      !phone ||
      !address ||
      !password
    ) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded.",
      });
    }

    const folderName = "ekartproducts";
    const imageArray = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        uploadStream.end(file.buffer);
      });
      imageArray.push({
        public_id: result.public_id,
        url: result.secure_url, // use secure_url for https link
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      profilePic: imageArray,
      role,
      email,
      phone,
      address,
      password: await bcrypt.hash(password, saltRounds),
    });

    await newUser.save();

    return res.status(201).json({
      message: "New User Registered Successfully",
      newUser,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// User Login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({
        message: "Please input correct password",
      });
    }

    // Token generation
    var token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4️⃣ Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 4. Success
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllusers = (req, res, next) => {
  res.status(200).json({
    message: "Routes are working fine",
  });
};
