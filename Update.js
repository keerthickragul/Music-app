import React from "react";
import "./UpdateCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Update() {
  const [currentSongName, setCurrentSongName] = useState("");
  const [newSongsName, setNewSongName] = useState("");
  const [newSongFile, setNewSongFile] = useState(null);
  const [newSongsImage, setNewSongImage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formsData = new FormData();
    formsData.append("songName", currentSongName);
    formsData.append("newSongName", newSongsName);
    formsData.append("songFile", newSongFile);

    const updateImageData = {
      songName: currentSongName,
      newSongName: newSongsName,
      newSongImage: newSongsImage,
    };

    try {
      const updateSongResponse = await axios.patch(
        "http://localhost:7000/musics/update",
        formsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song Updated:", updateSongResponse.data);

      const updateImageResponse = await axios.patch(
        "http://localhost:7000/musics/updateImage",
        updateImageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image URL updated:", updateImageResponse.data);

      console.log("Success: Updated both image and song");
      toast.success("Updated Successfully");
    } catch (err) {
      console.error(err);
      console.log("Update failed");
      toast.error("Invalid Value")
    }
  };

  function handleNewImage(e) {
    setNewSongImage(e.target.value);
  }

  function handleNewSong(e) {
    setNewSongFile(e.target.files[0]);
  }

  function handleCurrentSongName(e) {
    setCurrentSongName(e.target.value);
  }

  function handleNewSongName(e) {
    setNewSongName(e.target.value);
  }

  return (
    <>
      <div className="update-container">
        <div className="update-head">
          <h3 className="update-heading">Music Player App</h3>
        </div>
        <div className="update-content">
          <label htmlFor="Audio" className="update-label">
            Update Audio
          </label>
          <input
            type="file"
            id="Audio"
            onChange={handleNewSong}
            className="update-input"
          />
          <label htmlFor="songImage" className="update-label">
            Update Audio Image URL
          </label>
          <input
            type="text"
            id="songImage"
            placeholder="Enter image URL"
            onChange={handleNewImage}
            className="update-input"
          />
          <label htmlFor="songname" className="update-label">
            Song Name
          </label>
          <input
            type="text"
            id="songname"
            placeholder="Enter song name"
            onChange={handleCurrentSongName}
            className="update-input"
          />
          <label htmlFor="year" className="update-label">
            New Song Name
          </label>
          <input
            type="text"
            id="year"
            placeholder="Enter year"
            onChange={handleNewSongName}
            className="update-input"
          />
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Update;
