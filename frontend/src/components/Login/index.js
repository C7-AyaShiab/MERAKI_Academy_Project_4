import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { ProductContext } from "../../App";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { token, setToken, isLoggedIn, setisLoggedIn, userName, setUserName } =
    useContext(ProductContext);

  const login = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.userName);
        setUserName(res.data.userName);
        setMessage(res.data.message);
        setisLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setShowMessage(true);
        setMessage(err.response.data.message);
        setMessageType("warning");
      });
  };

  return (
    <div className="Login">
      <h3>Login</h3>
      <input
        className="email"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        className="password"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="Login-btn" type="submit" onClick={login}>
        Login
      </button>
      {showMessage ? <p className={messageType}>{message}</p> : ""}
    </div>
  );
};

export default Login;
