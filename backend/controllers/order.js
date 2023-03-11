const orderModel = require("../models/orderSchema");

const confirmOrder = (req, res) => {
  const userId = req.params.id;
  const {
    FullName,
    phoneNumber,
    country,
    city,
    address,
    details,
    payMethod,
    total,
  } = req.body;
  const newOrder = new orderModel({
    FullName,
    userId:userId,
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
      console.log(order);

      res.status(201).json({
        success: true,
        message: `your order is confirmed`,
        order: order,
      });
    })
    .catch((err) => {
      res.status(201).json({
        message: `Server error`,
        err: err.message,
      });
    });
};

const getOrderByUserId = (req, res) => {
    const userId = req.params.id;
    orderModel
      .find({ userId }).populate("details")
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

module.exports = { confirmOrder,getOrderByUserId };
