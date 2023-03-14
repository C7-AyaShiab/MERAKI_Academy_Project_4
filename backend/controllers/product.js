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
    review,
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
    .find()
    .populate("review")
    .exec()
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


const deleteProductById = (req, res) => {
  const id=req.params.id;
  productModel
    .findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
          message: `product with id:${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `product deleted`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,

      });
    });
};

const updateProductById = (req, res) => {
  const id=req.params.id;
  const updated=req.body;
  productModel
    .findByIdAndUpdate({_id:id}, updated,{new:true})
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
          message: `product with id:${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `product updated`,
          product:product,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,

      });
    });
};

const getProductById = (req, res) => {
  const id = req.params.id;
  productModel
    .findById(id)
    .populate("review")
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The product with id: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The product is found `,
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
const getProductByCategory = (req, res) => {
  const category = req.params.category;
  productModel
    .find({category})
    .populate("review")
    .exec()
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
const getProductByPrice = (req, res) => {
  const minPrice=req.query.minPrice;
  const maxPrice=req.query.maxPrice;
console.log(req.query)
  productModel
    .find({ $and: [{ price: { $lt: maxPrice } }, { price: { $gt: minPrice } }] })
    .populate("review")
    .exec()
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
module.exports = { createProduct, getAllProduct, deleteProductById, updateProductById,getProductById,getProductByCategory,getProductByPrice};
