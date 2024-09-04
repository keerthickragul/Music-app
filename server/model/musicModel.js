const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const musicSchema = new Schema({
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

const musicModel = mongoose.model("musics",musicSchema);
module.exports = {musicModel};
