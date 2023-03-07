import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [number, setNumber] = useState(0);
  const [showBtn, setShowBtn] = useState(true);

  const mystyle1 = {
    width: "230px",
    height: "50px",
    color: "white",
    background: "rgba(0, 0, 0, 0.7)",
    position: "relative",
    left: "130px",
    border: "none",
    cursor: "pointer",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        console.log(result.data);
        setProducts(result.data.product.slice(0, 6));
        setNumber(6);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home">
      {products &&
        products.map((product) => {
          return (
            <div className="product" key={product._id}>
              <img src={product.image} />
              <h6>{product.productName} </h6>
              <p>
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
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="12"
                    fill="currentColor"
                    className="bi bi-currency-dollar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                  </svg>
                  {product.price}
                </span>{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="22"
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
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
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                  </svg>
                </span>
              </p>
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
  );
};

export default Home;
