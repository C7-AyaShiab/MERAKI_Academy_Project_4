import React, { useContext } from "react";
import { ProductContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Category = () => {
  const { products, setProducts } = useContext(ProductContext);

  const navigate = useNavigate();
  const handleClick = (e) => {
    let categoryName = e.target.innerHTML;
    axios
      .get(`http://localhost:5000/products/search/${categoryName}`)
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate(`/categorylist/${categoryName}`);
  };

  const handleClick1 = (e) => {
   const maxPrice = e.target.className;
    const minPrice = e.target.id;
    axios
    .get(`http://localhost:5000/products/price?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    .then((result) => {
      console.log(result.data.product);
      setProducts(result.data.product);
    })
    .catch((err) => {
      console.log(err);
    });
    navigate(`/categorylist/price`)
  };
  return (
    <aside>
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

        <h5 className="price">Price</h5>
        <p className={25}  id={0} onClick={handleClick1}>Under $25</p>
        <p id="25"  className="50" onClick={handleClick1}>$25 to $50</p>
        <p id="100"  className="200" onClick={handleClick1}>$100 to $200</p>
        <p id="200"  className="2000" onClick={handleClick1}>$200 & above</p>

      </div>
    </aside>
  );
};

export default Category;
