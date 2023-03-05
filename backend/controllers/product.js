const productModel = require("../models/productSchema");

const createProduct = (req, res) => {
  const {
    productName,
    description,
    image,
    category,
    availability,
    price,
    rate,
  } = req.body;
  const product = new productModel({
    productName,
    description,
    image,
    category,
    availability,
    price,
    rate,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `product added`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllProduct = (req, res) => {
  productModel
    .find({})
    .then((product) => {
      if (product.length) {
        res.status(200).json({
          success: true,
          message: `All products`,
          product: product,
        });
      } else {
        res.status(200).json("No products are available");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = { createProduct, getAllProduct };
