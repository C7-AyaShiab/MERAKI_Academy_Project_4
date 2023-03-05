const express = require("express");
 
//import product from controllers
const { createProduct } = require("../controllers/product");

//create products router
const productsRouter = express.Router();

// http://localhost:5000/products/
productsRouter.post("/", createProduct);


module.exports = productsRouter;