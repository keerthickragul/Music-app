const express = require("express")
const musicRouter = express.Router();
const musicController = require("../controller/music")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/songs' })
musicRouter.post("/uploadImage",musicController.uploadMusicImage)
musicRouter.post("/upload",musicController.uploadMusic)
musicRouter.post("/image",musicController.uploadImage);
musicRouter.get("/get",musicController.getMusic)
musicRouter.get("/getImage",musicController.getMusicImage)
musicRouter.patch("/update",musicController.updateMusic);
musicRouter.patch("/updateImage",musicController.updateImage);
musicRouter.delete("/deleteMusic",musicController.deletedMusic)
musicRouter.delete("/deleteImage",musicController.deletedImage)
module.exports = {musicRouter}