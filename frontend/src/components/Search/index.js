import React, { useState, useContext } from "react";
import { FcSearch } from "react-icons/fc";
import { ProductContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { products, setProducts } = useContext(ProductContext);
  const handleChange = (e) => {
    const searchVal = e.target.value.toLowerCase();
    console.log(e.target.value.toLowerCase());
    console.log(searchVal);

    const filtered = products.filter((product) => {
      const re = new RegExp(`${searchVal}`, "g");
      console.log(re);

      return (
        product.productName.toLowerCase().match(re) ||
        product.description.toLowerCase().match(re)
      );
    });
    console.log(filtered);
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search.."
        onChange={handleChange}
      />

      <button className="search-btn">
        <FcSearch />
      </button>
    </div>
  );
};

export default Search;
