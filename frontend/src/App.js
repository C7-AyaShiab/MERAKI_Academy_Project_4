import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Navbar";
import Slider from "./components/Slider";
import Category from "./components/Category";
import List from "./components/List";
import Details from "./components/Details";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Order from "./components/Order";
import Footer from "./components/Footer";

import Search from "./components/Search";
export const ProductContext = createContext();

const clientId =
  "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com";
function App() {
  const [searchResult, setSearchResult] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loggedUser, setloggedUser] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      setisLoggedIn(true);
    }
  }, [token]);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <ProductContext.Provider
          value={{
            cartItems,
            setCartItems,
            products,
            setProducts,
            token,
            setToken,
            isLoggedIn,
            setisLoggedIn,
            loggedUser,
            setloggedUser,
            searchResult,
            setSearchResult,
          }}
        >
          <header className="App-header">
            <img
              src="./logo.jpg"
              style={{
                height: "85px",
                width: "150px",
                paddingLeft: "1rem",
                float: "left",
              }}
            />
            <Search />
          </header>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <Home />
                </>
              }
            />
            <Route path="/categorylist/:categoryName" element={<List />} />
            <Route path="/categorylist/price" element={<List />} />
            <Route path="/categorylist/search" element={<List />} />
            <Route path="/categorylist/rate" element={<List />} />
            <Route path="/:id" element={<Details />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />

            <Route path="/wishlist" element={<WishList />} />
          </Routes>
        </ProductContext.Provider>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
