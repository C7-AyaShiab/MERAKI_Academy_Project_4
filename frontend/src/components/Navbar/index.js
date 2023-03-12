import React, { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../App";
import { CgProfile } from "react-icons/cg";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
const Nav = () => {
  const {
    token,
    isLoggedIn,
    setisLoggedIn,
    setToken,
    loggedUser,
    setloggedUser,
  } = useContext(ProductContext);
  console.log(localStorage.getItem("loggedUser"));
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userId");
    setloggedUser("");
    setisLoggedIn(false);
  };
  return (
    <div className="Nav">
      {isLoggedIn ? (
        <div className="logged">
          <Link className="nav-choices" to="/">
            {" "}
            Home{" "}
          </Link>{" "}
          <Link className="nav-choices" to="/wishlist">
            <BsFillSuitHeartFill /> Wishlist
          </Link>
          <Link className="nav-choices" to="/cart">
            <TiShoppingCart/> Cart
          </Link>
          <span className="nav-choices">
            {" "}
            <CgProfile /> {localStorage.getItem("loggedUser")}
          </span>
          <Link className="nav-choices" onClick={logout} to="/">
            Logout
          </Link>
        </div>
      ) : (
        <div className="notlogged">
          <Link className="nav-choices" to="/">
            {" "}
            Home{" "}
          </Link>
          <Link className="nav-choices" to="/login">
            {" "}
            Login{" "}
          </Link>
          <Link className="nav-choices" to="/register">
            {" "}
            Register{" "}
          </Link>
          
        </div>
      )}
    </div>
  );
};

export default Nav;
