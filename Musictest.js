import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MusicCss.css";
import { useNavigate } from "react-router-dom";

const Musictest = () => {
  const [songs, setSongs] = useState([]);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const nav = useNavigate();
  const audioRefs = useRef([]);

  // Function to handle navigation to home
  function handleHome() {
    nav("/");
  }

  function handlePlaylist() {
    nav("/playlist");
  }

  // Fetching data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicResponse = await axios.get(
          "http://localhost:7000/musics/get"
        );
        setSongs(musicResponse.data);

        const imageResponse = await axios.get(
          "http://localhost:7000/musics/getImage"
        );
        setImages(imageResponse.data);

        console.log("Fetched images:", imageResponse.data); // Debugging line
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to convert song data to a playable URL
  const getSongUrl = (song) => {
    const blob = new Blob([new Uint8Array(song.songData.data)], {
      type: song.contentType,
    });
    return URL.createObjectURL(blob);
  };

  // Function to display the image of a song
  const displayImage = (image) => {
    try {
      if (image.songImage) {
        setCurrentImage(image.songImage);
      } else {
        throw new Error("Unexpected image data format");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      console.error("Image data causing error:", image);
    }
  };

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtering songs based on the search query
  const filteredSongs = songs.filter((song) =>
    song.songName.toLowerCase().includes(searchQuery.toLowerCase())
  );``

  // Function to handle button click for a song
  const handleButtonClick = async (song, image) => {
    console.log("Button clicked for song:", song.songName);

    try {
      // Prepare the song file upload with FormData
      const formData = new FormData();
      formData.append(
        "songFile",
        new Blob([new Uint8Array(song.songData.data)], {
          type: song.contentType,
        }),
        song.songName // Optional: specify a filename for the uploaded file
      );
      formData.append("songName", song.songName);

      // Upload song file
      const songResponse = await axios.post(
        "http://localhost:7000/play/listMusic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song uploaded:", songResponse.data);

      // Prepare the image URL data
      const imageData = {
        songName: song.songName,
        songImage: image.songImage,
      };

      // Upload image URL
      const imageResponse = await axios.post(
        "http://localhost:7000/play/listImage",
        imageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image URL uploaded:", imageResponse.data);

      console.log("Success: Uploaded both image and song to playlist");
    } catch (error) {
      console.error("Error sending data to server:", error);
      console.log("Upload failed");
    }
  };

  return (
    <div className="music-container">
      <div className="music-search">
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Search"
          className="music-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="music-content">
        <div className="music-left">
          <h3 className="music-library">FEATURES</h3>
          <ul className="music-ul">
            <li className="music-li" onClick={handleHome}>
              Home
            </li>
            <li className="music-li" onClick={handlePlaylist}>
              Playlist
            </li>
            <li className="music-li">Liked</li>
            <li className="music-li">Artist</li>
            <li className="music-li">Trending</li>
          </ul>
        </div>

        <div className="music-right">
          {filteredSongs.map((song, index) => (
            <div key={song._id} className="music-right-content">
              <div className="music-item" style={{ cursor: "pointer" }}>
                {song.songName}
              </div>
              {images[index] && (
                <div
                  className="music-image"
                  style={{ cursor: "pointer" }}
                  onClick={() => displayImage(images[index])}
                >
                  <img
                    src={images[index].songImage}
                    alt={images[index].songName}
                    className="image-thumbnail"
                  />
                </div>
              )}
              <div className="music-url">
                <audio controls ref={(el) => (audioRefs.current[index] = el)}>
                  <source src={getSongUrl(song)} type={song.contentType} />
                  Your browser does not support the audio element.
                </audio>
                <button
                  className="music-button"
                  onClick={() => handleButtonClick(song, images[index])}
                >
                  +
                </button>
              </div>
              <div className="music-button-container">
                {/* <button
                  className="music-button"
                  onClick={() => handleButtonClick(song)}
                >
                  More Info
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {currentImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Selected Image</h3>
          <img
            src={currentImage}
            alt="Selected song"
            className="max-w-full h-auto"
          />
        </div>
      )} */}
    </div>
  );
};

export default Musictest;
