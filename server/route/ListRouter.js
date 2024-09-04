const express = require("express");
const ListRouter = express.Router();
const ListController = require("../controller/ListController");


ListRouter.post("/listMusic",ListController.ListUploadMusic);
ListRouter.post("/listImage",ListController.ListUploadImage)
ListRouter.get("/listGet",ListController.getListMusic)
ListRouter.get("/listGetImage",ListController.getListImage);
module.exports = {ListRouter};