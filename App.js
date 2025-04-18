import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Nav from './Nav'
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import "./App.css";
import Music from "./Music";
import { useSelector } from "react-redux";
import Musictest from "./Musictest";
import Playlist from "./Playlist";
import Controls from "./Controls";
import Upload from "./Upload";
import Update from "./Update";
import Delete from "./Delete";
function App() {
  // const token = useSelector((state) => state.user.token)
  // console.log(token)
  return (
    <>
         <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/music" element={<Musictest />} />
            <Route path="/control" element={<Controls />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/update" element={<Update />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/delete" element={<Delete />} />
          </Routes>
        </BrowserRouter> 


    </>
  );
}

export default App;
