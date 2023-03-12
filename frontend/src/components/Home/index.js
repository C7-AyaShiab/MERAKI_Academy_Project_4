import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ProductContext } from "../../App";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [number, setNumber] = useState(0);
  const [showBtn, setShowBtn] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [imgId, setImgId] = useState(0);
  const [cartId, setcartId] = useState(0);

  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage, isLoggedIn] = useState("");
  const mystyle1 = {
    width: "230px",
    height: "50px",
    color: "white",
    background: "rgba(0, 0, 0, 0.7)",
    position: "relative",
    left: "150px",
    border: "none",
    cursor: "pointer",
  };
  console.log(isLoggedIn);
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
    setShowMessage(true);
    if (!isLoggedIn) {
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
    setcartId(e.target.id);
    setShowMessage(true);

    const userId = localStorage.getItem("userId");
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
    <>
      <div className="Home">
        {products &&
          products.map((product) => {
            return (
              <div className="product" key={product._id} id={product._id}>
                <img
                  src={product.image}
                  id={product._id}
                  onMouseOver={handleMouseOver}
                  onClick={handleClick}
                />
                {isShown && product._id == imgId ? (
                  <div className="product1" id={product._id}>
                    <h6 id={product._id}>{product.productName} </h6>
                    <p id={product._id}>
                      {product.rate}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </p>
                    <p>
                      <span>${product.price}</span>{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="22"
                          fill="currentColor"
                          className="bi bi-cart-plus"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id={product._id}
                            onClick={addToCart}
                            d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                          />
                          <path
                            id={product._id}
                            onClick={addToCart}
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                          />
                        </svg>
                      </span>{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="22"
                          fill="currentColor"
                          className="bi bi-suit-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id={product._id}
                            onClick={addToFav}
                            d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
                          />
                        </svg>
                      </span>
                    </p>
                    {showMessage && product._id === cartId ? (
                      <p id={product._id} className="message">
                        {message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}

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
    </>
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
