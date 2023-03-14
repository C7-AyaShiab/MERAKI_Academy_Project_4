const express = require("express");

//import product from controllers
const {
  createProduct,
  getAllProduct,
  deleteProductById,
  updateProductById,
  getProductById,
  getProductByCategory,
  getProductByPrice,
} = require("../controllers/product");
const {
  createReview,
  updatereviewById,
  deletereviewById,
} = require("../controllers/review");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//create products router
const productsRouter = express.Router();

// http://localhost:5000/products/
productsRouter.post(
  "/",
  authentication,
  authorization("CREATE_PRODUCT"),
  createProduct
);
productsRouter.get("/", getAllProduct);
productsRouter.get("/search/:category", getProductByCategory);
productsRouter.get("/price", getProductByPrice);

productsRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_PRODUCT"),
  deleteProductById
);
productsRouter.put(
  "/:id",
  authentication,
  authorization("UPDATE_PRODUCT"),
  updateProductById
);
productsRouter.get("/search1/:id", getProductById);
productsRouter.post(
  "/:id/review",
  authentication,
  authorization("CREATE_REVIEW"),
  createReview
);

productsRouter.put(
  "/:id/review/:reviewId",
  authentication,
  authorization("UPDATE_REVIEW"),
  updatereviewById
);
productsRouter.delete(
  "/:id/review/:reviewId",
  authentication,
  authorization("DELETE_REVIEW"),
  deletereviewById
);

module.exports = productsRouter;
