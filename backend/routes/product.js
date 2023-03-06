const express = require("express");
 
//import product from controllers
const { createProduct, getAllProduct, deleteProductById, updateProductById, getProductById } = require("../controllers/product");
const { createReview, updatereviewById } = require("../controllers/review");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//create products router
const productsRouter = express.Router();

// http://localhost:5000/products/
productsRouter.post("/", authentication, authorization("CREATE_PRODUCT"), createProduct);
productsRouter.get("/", getAllProduct);
productsRouter.delete("/:id",authentication, authorization("DELETE_PRODUCT"), deleteProductById);
productsRouter.put("/:id",authentication, authorization("UPDATE_PRODUCT"), updateProductById);
productsRouter.get("/search/:id", getProductById);
productsRouter.post("/:id/review", authentication, authorization("CREATE_REVIEW"), createReview);
productsRouter.put("/:id/review/:reviewId",authentication, authorization("UPDATE_REVIEW"), updatereviewById);




module.exports = productsRouter;