const reviewModel = require("../models/reviewSchema");
const productModel = require("../models/productSchema");
  

const createReview = (req, res) => {
  const id = req.params.id;
  const { review } = req.body;
  const userId = req.token.userId;
const userName = req.token.userName;
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
            message: `review added`,
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

const updatereviewById = (req, res) => {
  const id = req.params.id;
  const reviewId = req.params.reviewId;
  const userId = req.token.userId;
  const updatedReview = req.body;
  reviewModel
    .findByIdAndUpdate({ _id: reviewId, user: userId }, updatedReview)
    .populate("review")
    .exec()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `review updated`,
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
};


const deletereviewById = (req, res) => {
    const id = req.params.reviewId;
    const userId = req.token.userId;
    reviewModel
    .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
            res.status(404).json({
              success: false,
              message: `review with id:${id} is not found`,
            });
          } else {
            res.status(200).json({
              success: true,
              message: `review deleted`,
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

module.exports = {
  createReview,
  updatereviewById,
  deletereviewById,
};
