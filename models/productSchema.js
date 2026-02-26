const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    prodctStock:{
        type:String,
        enum:["Instock", "Not In Stock"],
        required:true
    },
    productCategory:{
        type:String,
        enum:["clothing","electronics","Food & Health","Sports","Travel"],
        required:true
    }
})

module.exports = mongoose.model("Product", productSchema);