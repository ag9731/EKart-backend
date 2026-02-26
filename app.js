const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// ✅ CORS CONFIG FOR COOKIES
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

const user = require("./routes/userRoutes");
app.use("/api/v1",user)

const product = require("./routes/productRoutes");
app.use("/api/v1",product);

module.exports = app;