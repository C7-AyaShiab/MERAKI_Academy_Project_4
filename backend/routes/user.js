const express = require("express");

//import user from controllers
const { register, login } = require("../controllers/user");

//create users router
const usersRouter = express.Router();

// http://localhost:5000/users/
usersRouter.post("/register",register);
usersRouter.post("/login",login);


module.exports = usersRouter;
