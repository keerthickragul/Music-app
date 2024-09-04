const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const musicImageSchema = new Schema({
    songName:{
        type:String,
        required:true
    },
    songImage:{
        // data:Buffer,
        // contentType:String
        type:String,
        required:true
    },
    
});

const musicImageModel = mongoose.model("musicImage",musicImageSchema);
module.exports = {musicImageModel};