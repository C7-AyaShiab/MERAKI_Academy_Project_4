const mongoose = require("mongoose");

//Initializing cart schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Cart", cartSchema);
