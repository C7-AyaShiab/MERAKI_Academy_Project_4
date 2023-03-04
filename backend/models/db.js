const mongoose = require("mongoose");

// connect mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/Project_4")
  .then(() => {
    console.log("DB Ready To Use");
  })
  .catch((err) => {
    console.log(err);
  });