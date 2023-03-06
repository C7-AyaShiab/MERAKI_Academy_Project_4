const mongoose = require("mongoose");

//Initializing order schema
const orderSchema = new mongoose.Schema({
  details: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  phoneNumber: { type: Number,required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
