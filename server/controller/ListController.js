const {PlayMusicModel} = require("../model/playlistMusic")
const {playImageModel} = require("../model/playlistImage");
const multer = require("multer");


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
const ListUploadMusic = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const newSong = new PlayMusicModel({
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



const ListUploadImage = async (req, res) => {
    try {
      const image = new playImageModel({
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


  const getListMusic = async (req, res) => {
    try{
        const getMusic = await PlayMusicModel.find();
        res.send(getMusic);
        
    }
    catch(err){
      res.status(500).json({ message: err });
      console.log(err);

    }
};

const getListImage = async(req,res) => {
  try{
    const getMusicImage = await playImageModel.find();
    res.send(getMusicImage);
  }
  catch(err){
    res.status(500).json({message: err})
    console.log(err);
  }
}




  module.exports = {ListUploadMusic, ListUploadImage, getListMusic, getListImage}