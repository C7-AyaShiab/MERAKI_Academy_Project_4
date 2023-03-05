const express = require("express");

//import user from controllers
const { register } = require("../controllers/user");

//create users router
const usersRouter = express.Router();

// http://localhost:5000/users/
usersRouter.post("/",register );

module.exports = usersRouter;
