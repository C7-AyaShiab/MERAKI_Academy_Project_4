import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("6404e2d6b01344b7ac9b9e09");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const register = () => {
    setShowMessage(true);
    if (firstName && lastName && email && password) {
      axios
        .post("http://localhost:5000/users/register", {
          firstName,
          lastName,
          email,
          password,
          role,
        })
        .then((res) => {
          setMessage(res.data.message);
          setMessageType("success");
        })
        .catch((err) => {
          if (password.length < 7) {
            setMessage("Password length must be equal or greater than 7 digit");
            setMessageType("warning");
          } else {
            setMessage("Email is not a valid email address");
            setMessageType("warning");
          }
        });
    } else {
      setMessage("Please Enter all fields");
      setMessageType("warning");
    }
  };

  return (
    <div className="design">
      <div className="Register">
        <h3>Register</h3>
        <input
          className="firstName"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <input
          className="lastName"
          type="text"
          placeholder="Last  Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

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

        <button className="Register-btn" type="submit" onClick={register}>
          Register
        </button>
        {showMessage ? <p className={messageType}>{message}</p> : ""}
      </div>
    </div>
  );
};

export default Register;
