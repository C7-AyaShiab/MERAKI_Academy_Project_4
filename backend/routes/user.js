const express = require("express");
const { createCart, getCartById, updateCart, deleteCartById } = require("../controllers/cart");
const { confirmOrder, getOrderByUserId } = require("../controllers/order");

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
usersRouter.delete("/:id/cart/:cartId", deleteCartById);
usersRouter.post("/:id/order", confirmOrder);
usersRouter.get("/:id/order", getOrderByUserId);


module.exports = usersRouter;
