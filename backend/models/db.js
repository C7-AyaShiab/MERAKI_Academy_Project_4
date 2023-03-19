const mongoose = require("mongoose");

// connect mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB Ready To Use");
  })
  .catch((err) => {
    console.log(err);
  });
