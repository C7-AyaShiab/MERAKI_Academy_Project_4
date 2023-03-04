const mongoose = require("mongoose");

//Initializing product schema 
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
});

const dataTypeSchema = new mongoose.Schema({
  string: { type: String },
  number: { type: Number, min: 18, max: 65 },
  arrayOfNumbers: [{ type: Number }],
  object: { type: mongoose.Schema.Types.Mixed },
  date: { type: Date, default: Date.now },
});

// it is possible to type the field type directly if there are no other options needed
const dataTypeSchema2 = new mongoose.Schema({
  string: String,
  arrayOfNumbers: [Number],
  object: mongoose.Schema.Types.Mixed,
  arrayOfObjects: [mongoose.Schema.Types.Mixed],
  arrayOfArrayOfStrings: [[String]],
});