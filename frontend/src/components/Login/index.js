import React, { useState, useContext } from "react";
import "./style.css";
import { ProductContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setuserId] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { setToken, setisLoggedIn, setloggedUser } = useContext(ProductContext);

  const login = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        setuserId(res.data.userId);
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

  const loginGoogle = (result) => {
    const { credential, clientId } = result;
    axios
      .post("http://localhost:5000/users/googlelogin", {
        credential,
        clientId,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("loggedUser", res.data.name);
        setloggedUser(res.data.name);

        const { family_name, given_name, email } = res.data;
        const fakePass = family_name + 123456;
        console.log(email, fakePass);

        axios
          .post("http://localhost:5000/users/login", {
            email,
            password: fakePass,
          })
          .then((res) => {
            console.log(res.data);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setuserId(res.data.userId);
            localStorage.setItem("userId", res.data.userId);
            setisLoggedIn(true);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MDBContainer className="my-5" style={{marginLeft:"15rem"
    }}>
      <MDBCard
        className=" rounded-2"
        style={{ width: "60rem", marginRight: "0px" }}
      >
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories-vector-isolated-concept-metaphor-illustration_335657-2764.jpg?w=360"
              alt="login form"
              className="rounded-start w-100"
              style={{ height: "30rem" }}
            />
          </MDBCol>

          <MDBCol md="4">
            <MDBCardBody
              className="d-flex flex-column"
              style={{ width: "30rem" }}
            >
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
                className="fw-normal my-3 pb-2"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-2"
                style={{width:"400px"}}
                id="formControlLg"
                size="lg"
                className="email"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <MDBInput 
              style={{width:"400px"}}
                wrapperClass="mb-2"
                id="formControlLg"
                size="lg"
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MDBBtn
              style={{width:"400px"}}
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={login}
              >
                Login
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
<hr/>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a
                  href="http://localhost:3000/register"
                  style={{ color: "#393f81" }}
                >
                  Register here
                </a>
              </p>

              {showMessage ? <p className={messageType}>{message}</p> : ""}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
