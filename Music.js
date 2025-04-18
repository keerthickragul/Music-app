import React from "react";
import axios from "axios";
import "./MusicCss.css";

function Music() {

const handleMusic = async(req,res) => {
  try {
    const music = await axios.get("http://localhost:7000/musics/get");
    console.log(music)
  }
  catch(err){
    console.error("Error during fetching music...",err.message);
    console.log(err)
  }
}



const handleMusicImage = async(req,res) => {
  try {
    const musicImage = await axios.get("http://localhost:7000/musics/getImage");
    console.log(musicImage)
  }
  catch(err){
    console.error("Error during fetching music...",err.message);
    console.log(err)
  }
}




    var l = [1,2,3,4,5,6,7,8]
  return (
    <>
      <div className="music-container">
        <div className="music-search">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Search"
            className="music-input"
          />
        </div>
        <div></div>
        
        <div className="music-content">
          
          <div className="music-left">
            <ul className="music-ul">
                <li className="music-li">Home</li>
                <li className="music-li">playlist</li>
                <li className="music-li">Liked</li>
                <li className="music-li">Artist</li>
                <li className="music-li">Trending</li>
            </ul>
          </div>
          <div className="music-right">
            {l.map((val,index)=><div className="music-right-content">
                {val}
            </div>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Music;
