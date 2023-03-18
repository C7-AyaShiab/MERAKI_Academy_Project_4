import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ProductContext } from "../../App";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBRadio,
} from "mdb-react-ui-kit";
import { BsCash } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa";
import { TfiCreditCard } from "react-icons/tfi";
const Order = () => {
  const { cartItems, setCartItems } = useContext(ProductContext);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setcity] = useState("");
  const [address, setAddress] = useState("");
  const [payMethod, setpayMethod] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const subTotal = Number(localStorage.getItem("subTotal"));
  const shipping = parseFloat(subTotal * 0.05).toFixed(2);
  const total = parseFloat(subTotal + Number(shipping)).toFixed(2);
  const [Total, setTotal] = useState(total);
  const userId = localStorage.getItem("userId");
  const orderConfirmation = () => {
    setShowMessage(true);
    axios
      .post(`http://localhost:5000/users/${userId}/order/`, {
        fullName,
        phoneNumber,
        country,
        city,
        address,
        details: cartItems,
        payMethod,
        Total,
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        setMessage("Please fill all fields");
        console.log(err);
      });
  };
  console.log(cartItems);
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100" style={{marginLeft:"0px",marginRight:"0px"}}>
        <MDBRow
          className="justify-content-center align-items-center h-100"

        >
          <MDBCol md="10">
            <MDBRow>
              {/* <hr /> */}

              <MDBCol lg="8">
                <MDBCard
                  className="bg-primary text-white rounded-2"
                  style={{ border: "none", backgroundColor: "White" }}
                >
                  <MDBCardBody
                    className="p-4"
                    style={{ backgroundColor: "White" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography tag="h5" className="mb-0">
                        Order Confirmation
                      </MDBTypography>
                    </div>

                    <form className="mt-4" style={{ color: "black" }}>
                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Full Name"
                        size="M"
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Phone Number"
                        size="M"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Country"
                        size="M"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="City"
                        size="M"
                        onChange={(e) => {
                          setcity(e.target.value);
                        }}
                      />
                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Address"
                        size="M"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                      <div className="d-flex flex-row pb-3">
                        <div className="d-flex align-items-center pe-2">
                          <MDBRadio
                            type="radio"
                            name="radio2"
                            value="Cash on delivery"
                            onChange={(e) => {
                              setpayMethod(e.target.value);
                            }}
                          />
                        </div>
                        <div className="rounded border w-100 p-1">
                          <p className="d-flex align-items-center mb-0">
                            <BsCash />
                            Cash on delivery
                          </p>
                        </div>
                      </div>

                      <div className="d-flex flex-row pb-3">
                        <div className="d-flex align-items-center pe-1">
                          <MDBRadio
                            type="radio"
                            name="radio2"
                            value="PayPal"
                            onChange={(e) => {
                              setpayMethod(e.target.value);
                            }}
                          />
                        </div>
                        <div className="rounded border w-100 p-1">
                          <p className="d-flex align-items-center mb-0">
                            <FaCcPaypal /> PayPal
                          </p>
                        </div>
                      </div>
                      <div className="d-flex flex-row pb-3">
                        <div className="d-flex align-items-center pe-2">
                          <MDBRadio
                            type="radio"
                            name="radio3"
                            value="Credit/Debit Card"
                            onChange={(e) => {
                              setpayMethod(e.target.value);
                            }}
                          />
                        </div>
                        <div className="rounded border w-100 p-2">
                          <p className="d-flex align-items-center mb-0">
                            <TfiCreditCard />
                            Credit/Debit Card
                          </p>
                        </div>
                      </div>

                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Expire Date: MM/YY"
                        size="M"
                        maxLength={7}
                        minLength={7}
                      />

                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Card Number"
                        size="M"
                        minLength="19"
                        maxLength="19"
                      />

                      <MDBInput
                        className="mb-4 mb-xl-4"
                        placeholder="Cvv"
                        size="M"
                        minLength="3"
                        maxLength="3"
                        type="password"
                      />
                    </form>

                    <hr />
                    <div
                      className="d-flex justify-content-between"
                      style={{ color: "black", fontWeight: "700" }}
                    >
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">${subTotal}</p>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ color: "black", fontWeight: "700" }}
                    >
                      <p className="mb-0">Shipping</p>
                      <p className="mb-0">${shipping}</p>
                    </div>

                    <hr className="my-4" style={{ color: "black" }} />

                    <div
                      className="d-flex justify-content-between mb-4"
                      style={{ color: "black", fontWeight: "700" }}
                    >
                      <p className="mb-2">Total</p>
                      <p className="mb-2">${total}</p>
                    </div>

                    <MDBBtn
                      className="ms-3"
                      color="dark"
                      block
                      size="lg"
                      onClick={orderConfirmation}
                    >
                      PLACE ORDER
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
                {showMessage ? (
                  <p
                    style={{
                      color: "white",
                      fontWeight: "700",
                      backgroundColor: "#212529",
                    }}
                  >
                    {message}
                  </p>
                ) : (
                  ""
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Order;
