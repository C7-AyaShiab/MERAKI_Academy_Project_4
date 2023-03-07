import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";
import { Routes, Route,useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Category = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleClick = (e) => {
    let categoryName = e.target.innerHTML;
    navigate(`/categorylist/${categoryName}`);
  
  };
  return (
    <div >
      <h5>Explore Categories</h5>
      <div className="Category">
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
    </div>
  );
};

export default Category;
