import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { BsCash } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa";
import { TfiCreditCard } from "react-icons/tfi";
const Order = () => {
  return (
    <section
      className="h-100  w-50"
      style={{
        backgroundColor: "#eee",
        marginTop: "2rem",
        marginLeft: "12rem",
        padding: "0 2rem",
      }}
    >
      <MDBContainer className="py-5 h-100">
        <MDBCol md="3" lg="4" xl="3">
          <MDBRow>
            <MDBCol size="12" xl="3">
              <MDBInput
                className="mb-2 border-0"
                placeholder="Full Name"
                size="M"
              />
              <MDBInput
                className="mb-2 border-0"
                placeholder="Phone Number"
                size="M"
              />
              <MDBInput
                className="mb-2 border-0"
                placeholder="Country"
                size="M"
              />
              <MDBInput className="mb-2 border-0" placeholder="City" size="M" />
              <MDBInput
                className="mb-2 border-0"
                placeholder="Address"
                size="M"
              />
            </MDBCol>
          </MDBRow>
        </MDBCol>
 
        <MDBCol md="3" lg="4" xl="1">
        <div className="d-flex flex-row pb-1">
          <div className="d-flex align-items-center pe-1">
            <MDBRadio type="radio" name="radio2" value="" />
          </div>
          <div className="p-2">
            <p className="d-flex align-items-center mb-0">
              <BsCash />
              Cash on delivery
            </p>
          </div>
        </div>

        <div className="d-flex flex-row pb-1">
          <div className="d-flex align-items-center pe-2">
            <MDBRadio type="radio" name="radio2" value="" />
          </div>
          <div className=" p-2">
            <p className="d-flex align-items-center mb-2">
            <FaCcPaypal/>  PayPal
            </p>
          </div>
        </div>
        <div className="d-flex flex-row pb-1">
          <div className="pe-1">
            <MDBRadio type="radio" name="radio3" value="" />
          </div>
          <div className="p-2">
            <p className="d-flex align-items-center mb-0">
              <TfiCreditCard/>
              Credit/Debit Card
            </p>
          </div>
        </div>
        </MDBCol>
        <MDBCol md="6" lg="4" xl="6">
          <MDBRow>
            <MDBCol size="12" xl="6">
              <MDBInput
                className="mb-2 border-0"
                placeholder="Expire Date: MM/YY"
                size="M"
                maxLength={7}
                minLength={7}
              />
            </MDBCol>

            <MDBCol size="12" xl="6">
              <MDBInput
                className="mb-2 border-0"
                placeholder="Card Number"
                size="M"
                minlength="19"
                maxlength="19"
              />
              <MDBInput
                className="mb-2 border-0"
                placeholder="Cvv"
                size="M"
                minlength="3"
                maxlength="3"
                type="password"
              />
            </MDBCol>
          </MDBRow>
        </MDBCol>

        <MDBCol lg="4" xl="3">
          <div
            className="d-flex justify-content-between"
            style={{ fontWeight: "600" }}
          >
            <p className="mb-2">Subtotal</p>
            <p className="mb-2">$23.49</p>
          </div>

          <div
            className="d-flex justify-content-between"
            style={{ fontWeight: "600" }}
          >
            <p className="mb-0">Shipping</p>
            <p className="mb-0">$2.99</p>
          </div>

          <hr className="my-4" />

          <div
            className="d-flex justify-content-between mb-4"
            style={{ fontWeight: "700" }}
          >
            <p className="mb-2">Total (tax included)</p>
            <p className="mb-2">$26.48</p>
          </div>

          <MDBBtn
            className="ms-3"
            color="dark"
            block
            size="M"
            // onClick={checkout}
          >
            PLACE ORDER
          </MDBBtn>
        </MDBCol>
      </MDBContainer>
    </section>
  );
};

export default Order;
