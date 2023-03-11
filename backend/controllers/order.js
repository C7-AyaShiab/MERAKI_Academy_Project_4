const orderModel = require("../models/orderSchema");

const confirmOrder = (req, res) => {
  const userId = req.params.id;
  const {
    fullName,
    phoneNumber,
    country,
    city,
    address,
    details,
    payMethod,
    total,
  } = req.body;
  const newOrder = new orderModel({
    fullName,
    userId: userId,
    phoneNumber,
    country,
    city,
    address,
    details,
    payMethod,
    total,
  });

  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `your order is confirmed with Id: ${order._id}`,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server error`,
        err: err.message,
      });
    });
};

const getOrderByUserId = (req, res) => {
  const userId = req.params.id;
  orderModel
    .find({ userId })
    .populate("details")
    .then((order) => {
      res.status(200).json({
        success: true,
        message: `The order is found `,
        order: order,
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

module.exports = { confirmOrder, getOrderByUserId };
