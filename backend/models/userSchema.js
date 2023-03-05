const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const re= /^[a-z0-9]+@([a-z])+\.[a-z]{2,3}$/
//Initializing user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return re.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: { type: String, required: true, minlength: 7, trim: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  console.log()
this.password=await bcrypt.hash(this.password, 5) 
 
 
});


module.exports = mongoose.model("User", userSchema);
