const express = require("express");
const app = express();

app.use(express.json());

const user = require("./routes/userRoutes");
app.use("/api/v1",user)

module.exports = app;