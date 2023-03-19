import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaTrash } from "react-icons/fa";
import { CgDollar } from "react-icons/cg";
import { ProductContext } from "../../App";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(ProductContext);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}/cart`)
      .then((result) => {
        console.log(result.data.cart);
        setCartItems(result.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateCard = (e) => {
    const cartId = e.target.id;
    const updated = e.target.value;
    axios
      .put(
        `http://localhost:5000/users/${userId}/cart/${cartId}`,
        {
          amount: updated,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        const updatedCart = cartItems.map((cart, i) => {
          if (cart._id === cartId) {
            return result.data.cart;
          } else {
            return cart;
          }
        });
        setCartItems(updatedCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCart = (e) => {
    const cartId = e.target.id;
    axios
      .delete(`http://localhost:5000/users/${userId}/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        const newCartList = cartItems.filter((cart, i) => {
          return cart._id != cartId;
        });
        setCartItems(newCartList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkout = () => {
    navigate("/order");
  };

  const subTotal = cartItems
    .reduce((acc, cart) => acc + cart.amount * cart.items.price, 0)
    .toFixed(2);

  localStorage.setItem("subTotal", subTotal);

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer
        className="py-5 h-100"
        style={{ marginLeft: "0px", marginRight: "0px" }}
      >
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div
              className="d-flex justify-content-between align-items-center mb-2"
              style={{ width: "200px" }}
            >
              <h3>Shopping Cart</h3>
            </div>
            {cartItems &&
              cartItems.map((cart) => {
                return (
                  <MDBCard key={cart._id} className="rounded-3 mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={cart.items.image}
                          />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <p className="lead fw-normal mb-2">
                            {cart.items.productName}
                          </p>
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
                            defaultValue={cart.amount}
                            type="number"
                            size="sm"
                            id={cart._id}
                            onChange={updateCard}
                          />

                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                          <MDBTypography tag="h5" className="mb-0">
                            <CgDollar />
                            {cart.items.price}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                          <button
                            style={{ border: "none", backgroundColor: "white" }}
                            id={cart._id}
                            onClick={deleteCart}
                          >
                            <FaTrash
                              id={cart._id}
                              onClick={deleteCart}
                              className="text-danger"
                            />
                          </button>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                );
              })}
            <MDBCard className="mb-2">
              <div
                className="d-flex justify-content-between mb-1"
                style={{ fontWeight: "700" }}
              >
                <p className="mb-1" style={{ paddingLeft: "1.8rem" }}>
                  {" "}
                  Subtotal{" "}
                </p>
                <p className="mb-1" style={{ paddingRight: "1.8rem" }}>
                  {cartItems && subTotal}
                </p>
              </div>
            </MDBCard>

            <MDBCardBody>
              <MDBBtn
                className="ms-3"
                color="dark"
                block
                size="lg"
                onClick={checkout}
              >
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
