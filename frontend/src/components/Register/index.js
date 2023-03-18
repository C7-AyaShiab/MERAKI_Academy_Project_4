import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
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
  const loginGoogle = (result) => {
    const { credential, clientId } = result;
    axios
      .post("http://localhost:5000/users/googlelogin", {
        credential,
        clientId,
      })
      .then((res) => {
        console.log(res);
        const { family_name, given_name, email } = res.data;
        const fakePass = family_name + 123456;
        localStorage.setItem("fakePass", fakePass);

        axios
          .post("http://localhost:5000/users/register", {
            firstName: given_name,
            lastName: family_name,
            email,
            password: fakePass,
            role: "6404e2d6b01344b7ac9b9e09",
          })
          .then((res) => {
            console.log(res.data.user._id);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <MDBContainer className="py-5 h-100 center" >
      <MDBCard className=" rounded-2" style={{marginLeft:"0px",marginRight:"0px"}}>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://www.sonikapay.com/skin/front/assets/img/bg/signup-1.png"
              className="rounded-start"
              style={{ height: "35rem" }}
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
               
                <span className="h1 fw-bold mb-0">
                  <img
                    src="./logoW.png"
                    style={{
                      height: "120px",
                      width: "200px",
                    }}
                  />
                </span>
              </div>

              <h5
                className=" my-3 pb-2"
                style={{ letterSpacing: "1px", fontWeight: "700" }}
              >
                Join Us
              </h5>
              <MDBInput
                wrapperClass="mb-2"
                placeholder="First Name"
                type="text"
                className="firstName"
                style={{ width: "400px" }}
                id="formControlLg"
                size="lg"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-2"
                id="formControlLg"
                size="lg"
                className="lastName"
                type="text"
                placeholder="Last Name"
                style={{ width: "400px" }}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />

              <MDBInput
                wrapperClass="mb-2"
                id="formControlLg"
                size="lg"
                className="email"
                type="email"
                placeholder="Email"
                style={{ width: "400px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                size="lg"
                className="password"
                type="password"
                placeholder="Password"
                style={{ width: "400px" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MDBBtn
                className="mb-3 px-5"
                color="dark"
                size="lg"
                style={{ width: "400px" }}
                onClick={register}
              >
                Join
              </MDBBtn>

              <GoogleLogin
                width={"90000px"}
                theme={"filled_black"}
                size={"large"}
                onSuccess={loginGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {showMessage ? <p className={messageType}>{message}</p> : ""}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
