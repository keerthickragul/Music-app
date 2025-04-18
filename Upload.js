import React from "react";
import "../src/UploadCSS.css";
import axios from "axios";
import { useState ,useEffect} from "react";
import { toast } from "react-toastify";
function Upload() {
  const [songName, setName] = useState("");
  const [song, setSong] = useState(null);
  const [songImage, setImage] = useState("");
  const [year, setYear] = useState("");
  
  const handleUpload = async (e) => {
    // Prepare the song file upload with FormData
    e.preventDefault();
    const formData = new FormData();
    formData.append("songFile", song);
    formData.append("songName", songName);
    formData.append("year", year);

    // Prepare the image URL data
    const imageData = {
      songName: songName,
      songImage: songImage,
    };

    try {
      // Upload song file
      const songResponse = await axios.post(
        "http://localhost:7000/musics/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song uploaded:", songResponse.data);

      // Upload image URL
      const imageResponse = await axios.post(
        "http://localhost:7000/musics/image",
        imageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image URL uploaded:", imageResponse.data);

      console.log("Success: Uploaded both image and song");
      toast.success("Uploaded Successful")
    } catch (err) {
      console.error(err);
      console.log("Upload failed");
      toast.error("Invalid value")
    }
  };

  function handleImage(e) {
    setImage(e.target.value); // Assume this is a URL input for an image
  }

  function handleSong(e) {
    setSong(e.target.files[0]); // Get the file from the file input
  }

  function handleYear(e) {
    setYear(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  return (
    <>
      <div className="upload-container">
        <div className="upload-head">
          <h3 className="upload-heading">Music Player App</h3>
        </div>
        <div className="upload-content">
          <label htmlFor="Audio" className="upload-label">
            Audio
          </label>
          <input
            type="file"
            id="Audio"
            onChange={handleSong}
            className="upload-input"
          />
          <label htmlFor="songImage" className="upload-label">
            Audio Image URL
          </label>
          <input
            type="text"
            id="songImage"
            placeholder="Enter image URL"
            onChange={handleImage}
            className="upload-input"
          />
          <label htmlFor="songname" className="upload-label">
            Song Name
          </label>
          <input
            type="text"
            id="songname"
            placeholder="Enter song name"
            onChange={handleName}
            className="upload-input"
          />
          <label htmlFor="year" className="upload-label">
            Year
          </label>
          <input
            type="text"
            id="year"
            placeholder="Enter year"
            onChange={handleYear}
            className="upload-input"
          />
          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default Upload;
