import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlaylistCss.css";
import bin from "../src/images/bin.png";
import correct from "../src/images/correct.png";

function Playlist() {
  const [ListSongs, setListSongs] = useState([]);
  const [ListImages, setListImages] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const ListMusicResponse = await axios.get(
          "http://localhost:7000/play/listGet"
        );
        setListSongs(ListMusicResponse.data);
        const ListImageResponse = await axios.get(
          "http://localhost:7000/play/listGetImage"
        );
        setListImages(ListImageResponse.data);
        console.log("PlayList Songs and Images are fetched Successfully");
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchDatas();
  }, []);

  const base64Encode = (data) => {
    let binary = '';
    const bytes = new Uint8Array(data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <>
      <div className="playlist-container">
        <div className="playlist-head">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Search"
            className="playlist-input"
          />
        </div>
        <div className="playlist-content">
          <h3 className="playlist-title">USER PLAYLIST</h3>
          {ListSongs.map((song, index) => (
            <div key={song._id} className="playlist-item">
              <div className="playlist-image">
                {ListImages[index] && (
                  <img
                    src={ListImages[index].songImage}
                    alt={song.songName}
                    className="playlist-image-img"
                  />
                )}
              </div>
              <div className="playlist-audio">
                <audio controls className="audio-control">
                  <source
                    src={`data:${song.contentType};base64,${base64Encode(song.songData.data)}`}
                    type={song.contentType}
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="playlist-btn-container">
                <img src={bin} alt="remove" className="playlist-image1" />
                <img src={correct} alt="view" className="playlist-image2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Playlist;
