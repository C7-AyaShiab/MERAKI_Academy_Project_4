import React, { useState, useContext } from "react";
import "./style.css";
import { ProductContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setuserId] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const {
    setToken,
    setisLoggedIn,
    setloggedUser,
  } = useContext(ProductContext);

  const login = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        setuserId(res.data.userId)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("loggedUser", res.data.userName);
        setloggedUser(res.data.userName);
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

  const loginGoogle= (result) => {
    const {credential,clientId}=result
   axios
      .post("http://localhost:5000/users/googlelogin", {
        credential,
        clientId,
      })
      .then((res) => {
        console.log(res)
        setToken(credential);
        setuserId(res.data.userId)
        localStorage.setItem("token", credential);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("loggedUser", res.data.payload.name);
        setloggedUser( res.data.payload.name);
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
    <div className="design">
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
        <GoogleLogin
          width={"2000px"}
          theme={"filled_blue"}
          size={"large"}
          onSuccess={loginGoogle}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {showMessage ? <p className={messageType}>{message}</p> : ""}
      </div>
    </div>
  );
};

export default Login;
