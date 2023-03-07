import React, { useState, createContext } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Navbar";
import Slider from "./components/Slider";
import Category from "./components/Category";
export const ProductContext = createContext();
function App() {
  const [products, setProducts] = useState([]);
  return (
    <div className="App">
      <ProductContext.Provider value={{products,setProducts}}> 
      <header className="App-header">
        <h1>Project 4 </h1>
      </header>
      <Nav/>
      <Slider/>
      <Category/>
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/category" element={<Category />}/>
      </Routes>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
