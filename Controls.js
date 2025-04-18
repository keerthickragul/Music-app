import React from "react";
import "./ControlsCss.css";
import musicUupadte from "../src/images/image.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Controls() {
  const nav = useNavigate();
  function handleUpload() {
    nav("/upload");
  }

  function handleUpdate() {
    nav("/update");
  }

  function handleDelete(){
    nav("/delete")
  }
  return (
    <>
      <div className="control-container">
        <div className="control-head"></div>
        <div className="control-content">
          <h3 className="control-title">Admin Home</h3>
          <div className="control-item">
            <h2 className="control-item-value" onClick={handleUpload}>
              UPLOAD MUSIC
            </h2>
          </div>
          <div className="control-item">
            <h2 className="control-item-value" onClick={handleUpdate}>
              UPDATE MUSIC
            </h2>
          </div>
          <div className="control-item">
            <h2 className="control-item-value" onClick={handleDelete}>
              DELETE MUSIC</h2>
          </div>
          <div className="control-item">
            <h2 className="control-item-value">USER DETAILS</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
