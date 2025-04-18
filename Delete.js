import React from 'react';
import "./DeleteCss.css";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
function Delete() {
    const [deleteSongName, setDeleteSongName] = useState('');
    const [message, setMessage] = useState('');
  
    const handleDelete = async (e) => {
      e.preventDefault();
  
      const deleteData = {
        songName: deleteSongName,
      };
  
      try {
        // Deleting the image
        const deleteImageResponse = await axios.delete('http://localhost:7000/musics/deleteImage', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: deleteData,
        });
  
        if (deleteImageResponse.status === 200) {
          console.log('Image URL deleted:', deleteImageResponse.data);
        } else {
          console.log('Image URL not found or not deleted.');
        }
  
        // Deleting the song
        const deleteSongResponse = await axios.delete('http://localhost:7000/musics/deleteMusic', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: deleteData,
        });
  
        if (deleteSongResponse.status === 200) {
          console.log('Song Deleted:', deleteSongResponse.data);
          setMessage('Success: Deleted both image and song.');
        } else {
          console.log('Song not found or not deleted.');
          setMessage('Error: Song not found or not deleted.');
        }
        
      } catch (err) {
        console.error('Error deleting music:', err);
        setMessage('An error occurred during deletion.');
      }
    };
  
    function handleDeleteFunction(e) {
      setDeleteSongName(e.target.value);
    }


  return (
   <>
   <div className="delete-container">
        <div className="delete-head">
          <h3 className="delete-heading">Music Player App</h3>
        </div>
        <div className="delete-content">
          <label htmlFor="Audio" className="delete-label">
            Delete Audio
          </label>
          <input
            type="file"
            id="Audio"
           
            className="delete-input"
          />
          <label htmlFor="songImage" className="delete-label">
            Delete Audio Image URL
          </label>
          <input
            type="text"
            id="songImage"
            placeholder="Enter image URL"
            
            className="delete-input"
          />
          <label htmlFor="songname" className="delete-label">
            Song Name
          </label>
          <input
            type="text"
            id="songname"
            placeholder="Enter song name"
            onChange={handleDeleteFunction}
            className="delete-input"
          />
          <label htmlFor="year" className="delete-label">
            New Song Name
          </label>
          <input
            type="text"
            id="year"
            placeholder="Enter year"
            
            className="delete-input"
          />
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
   </>
  )
}

export default Delete