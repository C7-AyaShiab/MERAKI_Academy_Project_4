import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
} from "mdb-react-ui-kit";

const Cart = () => {
  const[cartItems,setCartItems]=useState([])
  const userId=localStorage.getItem("userId")
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}/cart`)
      .then((result) => {
         setCartItems(result.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography
                tag="h3"
                className="fw-normal mb-0 text-black"
                style={{ color: "black", marginLeft: "10rem" }}
              >
                Shopping Cart
              </MDBTypography>
            </div>
{cartItems && cartItems.map((product)=>{
  
})}
            <MDBCard className="rounded-3 mb-4">
              <MDBCardBody className="p-4">
                <MDBRow className="justify-content-between align-items-center">
                  <MDBCol md="2" lg="2" xl="2">
                    <MDBCardImage
                      className="rounded-3"
                      fluid
                      src={product.image}
                    />
                  </MDBCol>
                  <MDBCol md="3" lg="3" xl="3">
                    <p className="lead fw-normal mb-2">{product.productName}</p>
                  </MDBCol>
                  <MDBCol
                    md="3"
                    lg="3"
                    xl="2"
                    className="d-flex align-items-center justify-content-around"
                  >
                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="minus" />
                    </MDBBtn>

                    <MDBInput
                      min={1}
                      defaultValue={1}
                      type="number"
                      size="sm"
                    />

                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="plus" />
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                      {product.price}
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol md="1" lg="1" xl="1" className="text-end">
                    <a href="#!" className="text-danger">
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

        

            <MDBCard className="mb-2">
              <div
                className="d-flex justify-content-between mb-2"
                style={{ fontWeight: "700" }}
              >
                <p className="mb-1" style={{ paddingLeft: "1.8rem" }}>
                  Total{" "}
                </p>
                <p className="mb-1" style={{ paddingRight: "1.8rem" }}>
                  $26.48
                </p>
              </div>
            </MDBCard>

            <MDBCardBody>
              <MDBBtn className="ms-3" color="dark" block size="lg">
                CHECKOUT
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
