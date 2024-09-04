
const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const {userRouter} = require("./route/userRoute")
const {musicRouter} = require("./route/musicRouter")
const {ListRouter} = require("./route/ListRouter")
const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/",userRouter);
app.use("/musics",musicRouter);
// app.use("/list",ListRouter);
app.use("/play",ListRouter);


const DBconnected = async() =>{
    try{
        await mongoose.connect("mongodb+srv://keerthickragulr2022cse:ragul418026@ragul.y3vchqn.mongodb.net/music-player?retryWrites=true&w=majority&appName=Ragul")
        console.log("Db connected")
    }
    catch(err){
        console.log(err)
    }
}
DBconnected()
const port = 7000;
app.listen(port,() => {
    console.log(`port running at ${port}`)
})

