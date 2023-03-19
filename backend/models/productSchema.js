const mongoose = require("mongoose");

//Initializing product schema
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: [{ type: String, required: true }],
  availability: { type: Number },
  price: { type: Number, required: true },
  rate: { type: Number, required: true },
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Product", productSchema);
