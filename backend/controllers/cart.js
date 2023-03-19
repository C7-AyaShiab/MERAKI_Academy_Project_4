const cartModel = require("../models/cartSchema");

const createCart = (req, res) => {
  const id = req.token.userId;
  const { items } = req.body;
  const newCart = new cartModel({
    userId: id,
    items,
  });
  cartModel.find({ $and: [{ userId: id }, { items: items }] }).then((cart) => {
    if (cart.length > 0) {
      res
        .status(201)
        .json({
          success: true,
          message: `The product is already added to the cart`,
          cart: cart,
        });
    } else {
      newCart
        .save()
        .then((cart) => {
          res.status(201).json({
            success: true,
            message: `The product is added to the cart`,
            cart: cart,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server error`,
            err: err.message,
          });
        });
    }
  });
};

const getCartById = (req, res) => {
  const userId = req.params.id;
  cartModel
    .find({ userId })
    .populate("items")
    .exec()
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: `The cart is empty`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The cart is found `,
        cart: cart,
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
const updateCart = (req, res) => {
  const cartId = req.params.cartId;
  const updated = req.body;
  cartModel
    .findByIdAndUpdate({ _id: cartId }, updated, { new: true })
    .populate("items")
    .then((cart) => {
      if (!cart) {
        res.status(404).json({
          success: false,
          message: `cart with id:${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `cart updated`,
          cart: cart,
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
const deleteCartById = (req, res) => {
  const cartId = req.params.cartId;
  cartModel
    .findByIdAndDelete(cartId)
    .then((cart) => {
      if (!cart) {
        res.status(404).json({
          success: false,
          message: `cart with id:${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `cart deleted`,
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
module.exports = { createCart, getCartById, updateCart, deleteCartById };
