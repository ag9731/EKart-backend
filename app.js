const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const user = require("./routes/userRoutes");
app.use("/api/v1",user)

module.exports = app;