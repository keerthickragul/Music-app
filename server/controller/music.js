const { musicModel } = require("../model/musicModel");
const {musicImageModel} = require("../model/musicImageModel");
const multer  = require('multer')
const uploades = multer({ dest: 'uploads/' })
const mongoose = require("mongoose")
const path = require("path");
const fs = require("fs");
// const {pala} = require("../uploads/songs/pala.mp3")
// import {pala} from "../uploads/songs/pala.mp3";




const storage = multer.memoryStorage();

// File filter for MP3
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP3 files are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
}).single('songFile');



// Controller function for uploading MP3
const uploadMusic = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const newSong = new musicModel({
        songName: req.body.songName || 'Untitled',
        songData: req.file.buffer,
        contentType: req.file.mimetype
      });

      await newSong.save();

      res.status(200).json({ 
        message: "Song uploaded successfully to MongoDB",
        song: {
          id: newSong._id,
          name: newSong.songName,
          uploadDate: newSong.uploadDate
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving to database" });
    }
  });
};


//storage

const Storage = multer.diskStorage({
  destination: "uploads/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({
  storage:Storage
}).single("testImage")

//storage

const uploadMusicImage = async (req, res) => {
  uploads(req,res,(err) => {
    if(err){

      console.log(err)
    }
    else{
      const newMusicImage = new musicImageModel({
        songName: req.body.songName,
        songImage:{
          // data:req.file.filename,
          contentType:'image/png'
        },
      })
      newMusicImage.save()
      .then(() => res.send("successfully uploaded"))
      .catch((err) => console.log(err))
    }
    
  })
};




const uploadImage = async (req, res) => {
  try {
    const image = new musicImageModel({
      songName: req.body.songName,
      songImage: req.body.songImage // Assuming the client sends the HTTPS link
    });

    await image.save();
    res.status(200).send("Image URL successfully uploaded");
    console.log("Image URL successfully uploaded");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
};

  //Song Image upload

const getMusic = async (req, res) => {
    try{
        const getMusic = await musicModel.find();
        res.send(getMusic);
        
    }
    catch(err){
      res.status(500).json({ message: err });
      console.log(err);

    }
};

const getMusicImage = async(req,res) => {
  try{
    const getMusicImage = await musicImageModel.find();
    res.send(getMusicImage);
  }
  catch(err){
    res.status(500).json({message: err})
    console.log(err);
  }
}



const updateMusic = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }

    if (!req.file && !req.body.newSongName) {
      return res.status(400).json({ message: "No new song file or name provided" });
    }
    
    try {
      const currentSongName = req.body.songName;
      if (!currentSongName) {
        return res.status(400).json({ message: "Song name is required to find and update" });
      }

      const updateData = {};
      
      // Update the song name if a new one is provided
      if (req.body.newSongName) {
        updateData.songName = req.body.newSongName;
      }

      // Update the song file if a new one is uploaded
      if (req.file) {
        updateData.songData = req.file.buffer;
        updateData.contentType = req.file.mimetype;
      }

      const updatedSong = await musicModel.findOneAndUpdate(
        { songName: currentSongName },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedSong) {
        return res.status(404).json({ message: "Song not found" });
      }

      res.status(200).json({
        message: "Song updated successfully",
        song: {
          id: updatedSong._id,
          name: updatedSong.songName,
          uploadDate: updatedSong.uploadDate,
        },
      });
      console.log("Song updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating the song" });
    }
  });
};


const updateImage = async (req, res) => {
  try {
    const songName = req.body.songName;

    if (!songName) {
      return res.status(400).json({ message: "Current song name is required" });
    }

    const updatedData = {};

    if (req.body.newSongName) {
      updatedData.songName = req.body.newSongName;
    }

    if (req.body.newSongImage) {
      updatedData.songImage = req.body.newSongImage;
    }

    const updatedImage = await musicImageModel.findOneAndUpdate(
      { songName: songName },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image updated successfully" });
    console.log("Image updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating the image" });
  }
};


const deletedMusic = async(req,res) => {
  try{
    const songName = req.body.songName;
    const deleteMusic = await musicModel.findOneAndDelete({songName: songName});
    res.status(200).json({message : "Music Deleted Successfully"});
    console.log("Music Deleted Successfully");
  }
  catch(err){
    res.status(500).json({message : "Error in Deleting"});
    console.log(err);
  }
}

const deletedImage = async(req,res) => {
  try{
    const songName = req.body.songName;
    const deleteImage = await musicImageModel.findOneAndDelete({songName: songName});
    res.status(200).json({message:"Image Deleted Successfully"});
    console.log("Image Deleted Successfully");
  }
  catch(err){
    res.status(500).json({message : "Error in Deleting"});
    console.log(err);
  }
}



module.exports = { uploadMusic , getMusic, uploadMusicImage, getMusicImage, uploadImage ,updateMusic, updateImage, deletedMusic, deletedImage};
