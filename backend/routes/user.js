const express = require("express");
const { createCart, getCartById, updateCart } = require("../controllers/cart");

//import user from controllers
const { register, login } = require("../controllers/user");

//create users router
const usersRouter = express.Router();

// http://localhost:5000/users/
usersRouter.post("/register",register);
usersRouter.post("/login",login);
usersRouter.post("/:id/cart", createCart);
usersRouter.get("/:id/cart", getCartById);
usersRouter.put("/:id/cart/:cartId", updateCart);

module.exports = usersRouter;
