import React, { useEffect, useState, useMemo } from 'react';
import "./LoginCss.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:7000/login", payload);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      dispatch(setToken(res.data.token));
      toast.success("Success");

      const decodedToken = parseJwt(res.data.token);
      const name = decodedToken ? decodedToken.name : null;

      // Navigate based on the name field
      if (name === "admin") {
        nav('/control');
      } else {
        nav('/music');
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Invalid Value");
      console.log(error);
    }
  };

  const parseJwt = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  };

  const token = useSelector((state) => state.user.token);

  const parsedToken = useMemo(() => parseJwt(token), [token]);
  const name = parsedToken ? parsedToken.name : null;

  useEffect(() => {
    console.log(parsedToken);
    console.log(name);
  }, [parsedToken, name]);

  return (
    <>
      <div className='login-outer'>
        <div className="login">
          <div className="login-icon-container">
            <Link to='/' className="login-icon">
              <h1 className="login-icon">🡨</h1>
            </Link>
            <h1 className="music-icon"> ♫</h1>
          </div>
          <div className="login-head">
            <p className="login-para1">Login</p><br />
            <p className="login-para">Welcome Back</p>
          </div>
          <div className="login-input-container">
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Email"
              className="login-input"
              onChange={handleEmail}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="login-input"
              onChange={handlePassword}
            />
          </div>
          <div className="login-btn-container">
            <button className="login-btn" onClick={handleLogin}>Login</button>
          </div>
          <div className='login-details'>
            <p className='login-value'>Don't have an account?
              <Link to="/signup" className="login-value-anchor"> SIGNUP</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
