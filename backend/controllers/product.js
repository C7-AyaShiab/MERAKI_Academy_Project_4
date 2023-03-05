 const productModel=require("../models/productSchema")

 const createProduct = (req, res) => {
    const { productName, description,image,category,availability, price,rate } = req.body;
    const product = new productModel({
        productName, description,image,category,availability, price,rate
    });
  
    product
      .save()
      .then((article) => {
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

module.exports = {createProduct}
