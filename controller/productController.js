const Product = require("../models/productSchema");

exports.getAllProducts = (req, res, next) => {
  return res.status(200).json({
    message: "Rotes are working correctly",
  });
};

