const reviewModel = require("../models/reviewSchema");
const productModel = require("../models/productSchema");

const createReview = (req, res) => {
  const id = req.params.id;
  const { review } = req.body;
  const userId = req.token.userId;
  const newReview = new reviewModel({
    review,
    user: userId,
  });
  newReview
    .save()
    .then((result) => {
        console.log(result)
      productModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { review: result._id }, $inc: { __v: 1 } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            review: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

module.exports = {
  createReview,
};
