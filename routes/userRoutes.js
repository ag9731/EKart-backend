const express = require("express");
const { getAllusers, registerUser } = require("../controller/userController");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/users").get(getAllusers);
router.route("/register").post(upload.array("profilePic"), registerUser);

module.exports = router;