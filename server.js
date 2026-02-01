const app = require("./app");
const dotenv = require("dotenv");
const connecttoDB = require("./database/db");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(port, () => {
  connecttoDB();
  console.log("connected to port", port);
});
