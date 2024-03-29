const mongoose = require("mongoose");

//Initializing review schema
const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  user: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", reviewSchema);
