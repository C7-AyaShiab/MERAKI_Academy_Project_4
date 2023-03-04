const mongoose = require("mongoose");

//Initializing role schema
const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: [{ type: String, required: true }],
});

module.exports = mongoose.model("Role", rolesSchema);
