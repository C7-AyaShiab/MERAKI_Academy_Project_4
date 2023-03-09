import React, { useState, createContext,useEffect} from "react";
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

export const ProductContext = createContext();

const clientId =
  "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com";
function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loggedUser, setloggedUser] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  console.log(token)
  console.log(localStorage.getItem('token'))

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
    if(token){
      setisLoggedIn(true)
    }
  },[token])
  return (
      <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <ProductContext.Provider value={{ products, setProducts,token, setToken, isLoggedIn, setisLoggedIn, loggedUser, setloggedUser}}>
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
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />

        </Routes>
      </ProductContext.Provider>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
