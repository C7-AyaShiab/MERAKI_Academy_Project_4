const userModel = require("../models/userSchema");

const register = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account created successfully`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        res.status(409).json({
          success: false,
          message: `Email is already exist`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Server error`,
          err: err.message,
        });
      }
    });
};

module.exports = { register };

/* 
 {  "firstName":"aya",
  "lastName":"Shiab",
   "email":"aya@gmail.com", 
   "password":"12345678",
   "role":"6404839bbbe59c2213eb50b3"} 


*/
