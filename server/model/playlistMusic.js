const express = require("express");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const playMusicSchema = new Schema({
    songName: {
        type: String,
        required: true
      },
      songData: {
        type: Buffer,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      }
});



const PlayMusicModel = mongoose.model("playlistMusic",playMusicSchema);
module.exports = {PlayMusicModel};
