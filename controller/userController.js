const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

// Register User
exports.registerUser =async (req,res,next) => {
    try{
        const { firstName, lastName, role, email, phone, address,password } = req.body;
        const saltRounds = 10;
        
        if(!firstName || !lastName || !role || !email || !phone || !address || !password){
            return res.status(400).json({
                message:"All Fields are Required",
            })
        }

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({
          success: false,
          message: "No files were uploaded.",
         });
        }

        const folderName = "ekartproducts";
        const imageArray = [];

        for(const file of req.files){
            const result = await new Promise((resolve,reject)=>{
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
            })
              imageArray.push({
              public_id: result.public_id,
              url: result.secure_url, // use secure_url for https link
           });
        }
    
        const newUser = new User({
            firstName,
            lastName,
            profilePic:imageArray,
            role,
            email,
            phone,
            address,
            password: await bcrypt.hash(password,saltRounds)
        });

        await newUser.save();

       return res.status(201).json({
            message:"New User Registered Successfully",
            newUser,
        })
    }catch(error){
        res.status(404).json({
            message:error.message,
        })
    }


    
    
}




exports.getAllusers = (req,res,next) => {
    res.status(200).json({
        message:"Routes are working fine",
    })
}