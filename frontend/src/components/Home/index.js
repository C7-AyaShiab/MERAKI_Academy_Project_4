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
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProducts(result.data.product.slice(0, 8));
        setNumber(8);
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
    if (!userId) {
      navigate("/login");
    } else {
      products.forEach((product, i) => {
        if (product._id === e.target.id) {
          const fav1 = fav.filter((product) => {
            return product._id !== e.target.id;
          });
          fav1.push(product);
          localStorage.setItem("fav", JSON.stringify(fav1));
        }
      });
    }
  };

  const addToCart = (e) => {
    const productId = e.target.id;
    setShowMessage(true);
    axios
      .post(
        `http://localhost:5000/users/${userId}/cart`,
        {
          items: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        setMessage(result.data.message);
        console.log(result);
      })
      .catch((err) => {
        setMessage(err.data.message);
        console.log(err);
      });
  };

  console.log(showMessage);
  return (
    <div className="wrapper">
      <Category />
      <MDBRow className="row-cols-1 row-cols-md-4 g-4">
        {products &&
          products.map((product, i) => {
            return (
              <MDBCol key={product._id}>
                <MDBCard className="h-100" id={product._id}>
                  <MDBCardImage
                    src={product.image}
                    id={product._id}
                    onMouseOver={handleMouseOver}
                    onClick={handleClick}
                    position="top"
                  />
                  <MDBCardBody id={product._id}>
                    <MDBCardTitle
                      id={product._id}
                      style={{ fontSize: "18px", textAlign: "center" }}
                    >
                      {product.productName}
                    </MDBCardTitle>

                    <MDBCardText id={product._id}>
                      {product.rate}{" "}
                      <span>
                        <BsStarFill
                          style={{ color: "orange", fontSize: "1.2rem" }}
                        />
                      </span>
                    </MDBCardText>
                    <MDBCardText key={`text${i}`} id={product._id}>
                      ${product.price}
                      <button
                        style={{ border: "none", backgroundColor: "white" }}
                        id={product._id}
                        onClick={addToCart}
                      >
                        <TiShoppingCart
                          id={product._id}
                          style={{ fontSize: "1.8rem" }}
                        />
                      </button>
                      <button
                        style={{ border: "none", backgroundColor: "white" }}
                        id={product._id}
                        onClick={addToFav}
                      >
                        <BsFillSuitHeartFill
                          id={product._id}
                          style={{ fontSize: "1.4rem" }}
                        />
                      </button>
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
          className="more"
          onClick={() => {
            axios
              .get("http://localhost:5000/products")
              .then((result) => {
                console.log(result.data);
                setNumber(number + 8);

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
