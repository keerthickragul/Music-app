import React from "react";
import "./HomeCss.css";
import Nav from "./Nav";

function Home() {
  return (
    <>
      <Nav />
      <div className="home-container">
        <div className="home-content">
          <div home-heading>
            <h1 style={{ color: "#f7f9f6", fontSize: 70 }}>The Trending</h1>
            <h1 style={{ color: "#d2fbfc", fontSize: 60 }}>
              Record Breaking Album's
            </h1>
          </div>

          <div className="home-button-container">
            <button className="home-button1">Listen Now</button>
            <button className="home-button2">Add To Queue</button>
          </div>
        </div>

        <div className="home-image-container">
          <img
            className="home-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsRLM-p4wdoQszQPi8i1mr-lTa3wLwmtAdAA&s" alt="image1"
          />
          <img
            className="home-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq7tTUAagMd5bXOseRhBHANONxOaG45s3XmQ&s" alt="image2"
          />
          <img
            className="home-image"
            src="https://i.pinimg.com/236x/58/d5/e4/58d5e4a51e09262eed7cac5e34440b0e.jpg" alt="image3"
          />
          <img
            className="home-image"
            src="https://i1.sndcdn.com/artworks-f9Y5onysBhzcsnVJ-ESSxNQ-t500x500.jpg" alt="image4"
          />
          <img
            className="home-image"
            src="https://upload.wikimedia.org/wikipedia/en/6/6f/War_official_poster.jpg" alt="image5"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
