import React, {  useContext } from "react";

import { useNavigate } from "react-router-dom";
import "./style.css";

const Category = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    let categoryName = e.target.innerHTML;
    navigate(`/categorylist/${categoryName}`);
  
  };
  return (
    <aside>
    <div className="Category" >
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
      </aside>
   
  );
};

export default Category;
