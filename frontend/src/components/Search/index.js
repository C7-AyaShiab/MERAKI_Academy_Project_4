import React, { useState, useContext } from "react";
import { FcSearch } from "react-icons/fc";
import { ProductContext } from "../../App";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const navigate = useNavigate();
  const { products, setProducts,setSearchResult,searchResult } =
    useContext(ProductContext);
    const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setSearchResult(true);
    const searchVal = e.target.value.toLowerCase();
    setInputValue(searchVal)
    if (searchVal === "") {
      setSearchResult(false);
    }
    navigate("/categorylist/search");
    const filtered = products.filter((product) => {
      const re = new RegExp(searchVal, "g");
      console.log(re);
      return (
        product.productName.toLowerCase().match(re) ||
        product.description.toLowerCase().match(re)
      );
    });
    setProducts(filtered);
  };
const clearInput=()=>{
    setInputValue("")
    
}
  return (
    <div className="search-container" >
      <input
        className="search"
        type="text"
        placeholder="Search.."
        value={inputValue}
        onChange={handleChange}
      />

      <button className="search-btn" onClick={clearInput}>
        <FcSearch />
      </button>
    </div>
  );
};

export default Search;
