const express = require("express");
const {
  createCart,
  getCartById,
  updateCart,
  deleteCartById,
} = require("../controllers/cart");
const { confirmOrder, getOrderByUserId } = require("../controllers/order");

//import user from controllers
const { register, login, googleLogin } = require("../controllers/user");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//create users router
const usersRouter = express.Router();

// http://localhost:5000/users/
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/googlelogin", googleLogin);
usersRouter.post(
  "/cart",
  authentication,
  authorization("ADD_TO_CART"),
  createCart
);
usersRouter.get("/:id/cart", getCartById);
usersRouter.put(
  "/:id/cart/:cartId",
  authentication,
  authorization("UPDATE_CART"),
  updateCart
);
usersRouter.delete(
  "/:id/cart/:cartId",
  authentication,
  authorization("DELETE_FROM_CART"),
  deleteCartById
);
usersRouter.post("/:id/order", confirmOrder);
usersRouter.get("/:id/order", getOrderByUserId);

module.exports = usersRouter;
