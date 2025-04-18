import "./SignupCss.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Signup() {
const[names,setNames] = useState("");
const[emails,setEmails] = useState("")
const[passwords,setPasswords] = useState("")

const handleNames = (e) => {
  setNames(e.target.value)
}

const handleEmails = (e) => {
  setEmails(e.target.value)
}

const handlePasswords = (e) => {
  setPasswords(e.target.value)
}

const handleSignup = async(e) => {
  e.preventDefault();
  const payload = {
    name: names,
    email: emails,
    password:passwords

  }
  try{
    const res = await axios.post("http://localhost:7000/register",payload)
    console.log(res)
    console.log("Success")
  }
  catch(err){
    console.log(err)
  }

}

  return (
    <>
    <div className="signup-outer">
      <div className="signup">
        <div className="signup-icon-container">
          <Link to='/' className="signup-icon">
          <h1 className="signup-icon">🡨</h1>
          </Link>
          <h1 className="music-icon"> ♫</h1>
        </div>
        <div className="signup-head">
          <p className="signup-para">Signup</p>
        </div>
        <div className="signup-input-container">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Username"
            className="signup-input"
            onChange={handleNames}
          />
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Email"
            className="signup-input"
            onChange={handleEmails}
          />
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Password"
            className="signup-input"
            onChange={handlePasswords}
          />
        </div>
        <div className="signup-btn-container">
          <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
        </div>
        <div className='signup-details'>
            <p className='signup-value'>Already have account ? 
            <Link to="/login" class="signup-value-anchor">  LOGIN</Link>
            </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Signup;
