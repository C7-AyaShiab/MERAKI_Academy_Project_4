import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Category = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [Ads, setAds] = useState();
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

  let chosen;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/search/Best seller`)
      .then((result) => {
        console.log(result.data.product);
        setAds(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (Ads) {
    chosen = Ads[Math.floor(Math.random() * Ads.length)];
  }
  const handleClick1 = (e) => {
    const maxPrice = e.target.className;
    const minPrice = e.target.id;
    axios
      .get(
        `http://localhost:5000/products/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
      )
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
        navigate(`/categorylist/price`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rateFiltering = (e) => {
    const rate = e.target.className;
    axios
      .get(`http://localhost:5000/products/rate?q=${rate}`)
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
        navigate(`/categorylist/rate`);
      })
      .catch((err) => {
        console.log(err);
      });
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

        <h5 className="other">Price</h5>
        <p className={25} id={0} onClick={handleClick1}>
          Under $25
        </p>
        <p id="25" className="50" onClick={handleClick1}>
          $25 to $50
        </p>
        <p id="100" className="200" onClick={handleClick1}>
          $100 to $200
        </p>
        <p id="200" className="2000" onClick={handleClick1}>
          $200 & above
        </p>

        <h5 className="other">Average Review</h5>
        <p className="4" onClick={rateFiltering}>
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarHalf style={{ color: "orange" }} />{" "}
        </p>

        <p className="3" onClick={rateFiltering}>
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarHalf style={{ color: "orange" }} /> <BsStar />
        </p>

        <p className="2" onClick={rateFiltering}>
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarHalf style={{ color: "orange" }} /> <BsStar /> <BsStar />
        </p>

        <p className="1" onClick={rateFiltering}>
          <BsStarFill style={{ color: "orange" }} />{" "}
          <BsStarHalf style={{ color: "orange" }} /> <BsStar /> <BsStar />{" "}
          <BsStar />
        </p>
        <div className="best">
          {chosen && (
            <>
              {" "}
              <img src={chosen.image} className="Ads" id={chosen._id} />
              <p>{chosen.productName}</p>
              <p>
                <BsStarFill style={{ color: "orange" }} />{" "}
                <BsStarFill style={{ color: "orange" }} />{" "}
                <BsStarFill style={{ color: "orange" }} />{" "}
                <BsStarFill style={{ color: "orange" }} />{" "}
                <BsStarHalf style={{ color: "orange" }} />{" "}
              </p>
              <p>${chosen.price}</p>
              <button
                className="best-btn"
                id={chosen._id}
                onClick={(e) => {
                  let id = e.target.id;
                  navigate(`/${id}`);
                }}
              >
                Shop Now
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Category;
