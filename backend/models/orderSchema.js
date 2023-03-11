const mongoose = require("mongoose");

//Initializing order schema
const orderSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  phoneNumber: { type: Number,required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  details: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
});

module.exports = mongoose.model("Order", orderSchema);
