import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";
import axios from "axios";
import "./style.css";

const Category = () => {
  const { products, setProducts } = useContext(ProductContext);

  const handleClick = (e) => {
    let category = e.target.innerHTML;
    axios
      .get(`http://localhost:5000/products/search/${category}`)
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Category">
      <h5>Explore Categories</h5>
      <p onClick={handleClick}>Home</p>
      <p onClick={handleClick}>Mens clothing</p>
      <p onClick={handleClick}>Womens clothing</p>
      <p onClick={handleClick}>Pet supplies</p>
      <p onClick={handleClick}>Furniture</p>
      <p onClick={handleClick}>Lamp</p>
      <p onClick={handleClick}>Decor</p>
      <p onClick={handleClick}>Kitchen</p>
      <p onClick={handleClick}>Bathroom</p>
    </div>
  );
};

export default Category;
