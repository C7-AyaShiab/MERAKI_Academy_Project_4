const express = require("express");
 
//import product from controllers
const { createProduct, getAllProduct } = require("../controllers/product");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//create products router
const productsRouter = express.Router();

// http://localhost:5000/products/
productsRouter.post("/", authentication,
authorization("CREATE_PRODUCT"), createProduct);
productsRouter.get("/", getAllProduct);


module.exports = productsRouter;