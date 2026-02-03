const express = require("express");
const { getAllusers, registerUser, loginUser } = require("../controller/userController");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/users").get(getAllusers);
router.route("/register").post(upload.array("profilePic"), registerUser);
router.route("/login").post(loginUser);

module.exports = router;