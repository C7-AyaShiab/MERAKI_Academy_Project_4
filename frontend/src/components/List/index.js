import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { BsFillSuitHeartFill, BsStarFill } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { CgDollar } from "react-icons/cg";
import Category from "../Category";

const List = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);

  const { categoryName} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/search/${categoryName}`)
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    let id = e.target.id;
    navigate(`/${id}`);
  };
  let fav = JSON.parse(localStorage.getItem("fav"));
  const addToFav = (e) => {
    console.log(e.target.id);
    products.forEach((product, i) => {
      if (product._id === e.target.id) {
        if (fav.includes(product)) {
          return;
        } else {
          fav.splice(i, 1, product);
        }
      }
    });

    localStorage.setItem("fav", JSON.stringify(fav));
  };
  return (
    <div className="wrapper1">
      <Category />
      <div className="List">
        {products &&
          products.map((product) => {
            return (
              <div className="item" key={product._id} id={product._id}>
                <img
                  src={product.image}
                  id={product._id}
                  onClick={handleClick}
                />
                <div id={product._id}>
                  <h6 id={product._id}>{product.productName} </h6>
                  <p id={product._id}>
                    {product.rate} <BsStarFill style={{ color: "orange" }} />
                  </p>
                  <p>
                    <span>
                      <CgDollar style={{ fontSize: "1.2rem" }} />
                      {product.price}
                    </span>{" "}
                    <span id={product._id}>
                      <TiShoppingCart
                        id={product._id}
                        style={{ fontSize: "1.8rem" }}
                      />{" "}
                      <BsFillSuitHeartFill
                        id={product._id}
                        style={{ fontSize: "1.4rem" }}
                        onClick={addToFav}
                      />
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default List;
