import React, { useState, useContext } from "react";
import "./style.css";
import { ProductContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const {
    token,
    setToken,
    isLoggedIn,
    setisLoggedIn,
    loggedUser,
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
        localStorage.setItem("token", res.data.token);
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

  const customStyle1 = {
    marginLeft: "100px",

    width: "97%",
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
          onSuccess={(credentialResponse) => {
         
            console.log(credentialResponse);
          }}
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
