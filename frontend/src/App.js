import React, { useState, createContext } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Navbar";
import Slider from "./components/Slider";
import Category from "./components/Category";
import List from "./components/List";
import Details from "./components/Details";
import Register from "./components/Register";

export const ProductContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      <ProductContext.Provider value={{ products, setProducts }}>
        <header className="App-header">
          <h1>Project 4 </h1>
        </header>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider /> <Category /> <Home />{" "}
              </>
            }
          />
          <Route path="/categorylist/:categoryName" element={<List />} />
          <Route path="/:id" element={<Details />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
