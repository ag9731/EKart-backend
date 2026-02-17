const app = require("./app");
const dotenv = require("dotenv");
const connecttoDB = require("./database/db");
const cloudinary = require("cloudinary").v2;
var jwt = require("jsonwebtoken");
var cookie = require("cookie");

// cookie Parser
// console.log(cookieParser);
const cookieObject = cookie.parseCookie("foo=bar; equation=E%3Dmc%5E2");
console.log("CookieObject ", cookieObject);
const cookieHeader = cookie.stringifyCookie(cookieObject);
console.log("Cookie Header ", cookieHeader);

dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;
const jwtsecret = process.env.JWT_SECRET;

jwt.sign({ foo: "bar" }, jwtsecret, function (err, token) {
  // console.log(token);
});

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
