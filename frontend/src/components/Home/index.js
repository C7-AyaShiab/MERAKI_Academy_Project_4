import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ProductContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { BsFillSuitHeartFill, BsStarFill } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";

import "./style.css";
import Category from "../Category";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
const Home = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [number, setNumber] = useState(0);
  const [showBtn, setShowBtn] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [imgId, setImgId] = useState(0);
  const [cartId, setcartId] = useState(0);

  const [showMessage, setShowMessage] = useState(false);
  const userId = localStorage.getItem("userId");
  const [message, setMessage, isLoggedIn] = useState("");
  const mystyle1 = {
    width: "230px",
    height: "50px",
    color: "white",
    background: "rgba(0, 0, 0, 0.7)",
    position: "relative",
    margin: "1rem",
    left: "20rem",
    border: "none",
    cursor: "pointer",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProducts(result.data.product.slice(0, 6));
        setNumber(6);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleMouseOver = (e) => {
    setImgId(e.target.id);
    setIsShown(!isShown);
  };

  const handleClick = (e) => {
    let id = e.target.id;
    navigate(`/${id}`);
  };

  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  const addToFav = (e) => {
    console.log(e.target);
    console.log(e.target.id);

    setShowMessage(true);
    if (!userId) {
      setMessage(`Please login first`);
    } else {
      products.forEach((product, i) => {
        if (product._id === e.target.id) {
          console.log(product);
          if (fav.includes(product)) {
            return;
          } else {
            fav.splice(i, 1, product);
          }
        }
      });
      localStorage.setItem("fav", JSON.stringify(fav));
    }
  };

  const addToCart = (e) => {
    const productId = e.target.id;
    setcartId(e);
    setShowMessage(true);
    console.log(e.target.id);

    if (!userId) {
      setMessage(`Please login first`);
    } else {
      axios
        .post(`http://localhost:5000/users/${userId}/cart`, {
          items: productId,
        })
        .then((result) => {
          setMessage(result.data.message);
          console.log(result);
        })
        .catch((err) => {
          setMessage(err.data.message);
          console.log(err);
        });
    }
  };

  console.log(showMessage);
  return (
    <div className="wrapper">
      <Category />
      <MDBRow className="row-cols-1 row-cols-md-2 g-4">
        {products &&
          products.map((product, i) => {
            return (
              <MDBCol key={product._id}>
                <MDBCard id={product._id}>
                  <MDBCardImage
                    src={product.image}
                    id={product._id}
                    onMouseOver={handleMouseOver}
                    onClick={handleClick}
                  />
                  <MDBCardBody id={product._id}>
                    <MDBCardTitle id={product._id} style={{ fontSize: "18px",textAlign:"center" }}>
                      {product.productName}
                    </MDBCardTitle>

                    <MDBCardText id={product._id}>
                      {product.rate}
                      <BsStarFill style={{ color: "orange" }} />
                    </MDBCardText>
                    <MDBCardText key={`text${i}`} id={product._id}>
                      ${product.price}
                      <MDBBtn
                        color="tertiary"
                        rippleColor="light"
                        id={product._id}
                        onClick={addToCart}
                      >
                        <TiShoppingCart id={product._id} />
                      </MDBBtn>
                      <MDBBtn
                        color="tertiary"
                        id={product._id}
                        rippleColor="light"
                        onClick={addToFav}
                      >
                        <BsFillSuitHeartFill id={product._id} />
                      </MDBBtn>
                    </MDBCardText>
                    {showMessage && product._id === cartId ? (
                      <p id={product._id} className="message">
                        {message}
                      </p>
                    ) : (
                      ""
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
      </MDBRow>

      {showBtn ? (
        <button
          style={mystyle1}
          onClick={() => {
            axios
              .get("http://localhost:5000/products")
              .then((result) => {
                console.log(result.data);
                setNumber(number + 6);
                if (number === 24) {
                  setShowBtn(!showBtn);
                }
                setProducts(result.data.product.slice(0, number));
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Show More Products
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

/* 
  // let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const addToCart = (e) => {
    console.log(e.target);
    products.forEach((product, i) => {
      if (product._id === e.target.id) {
        console.log(product);
        setCount(count + 1);
        cart.push(product)
        if((localStorage.getItem("cart")).includes(product)){
          console.log(true)

        }
        else{
          console.log(false)

        }
        // localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  }; */
