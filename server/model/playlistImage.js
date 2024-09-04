const express = require("express");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const playImageSchema = new Schema({
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

const playImageModel = mongoose.model("playListImage",playImageSchema);
module.exports = {playImageModel};