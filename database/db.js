const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config/config.env"})
const database = process.env.DB;


async function connecttoDB(){
    try{
        await mongoose.connect(database);
        console.log("connected to database successfully");
    }catch(error){
        console.log("!!Error",error.message);
    }
}

module.exports = connecttoDB;
