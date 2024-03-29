const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

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

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModel
    .findOne({ email })
    .populate("role")
    .exec()
    .then(async (result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message: `Email is not exist or password is not correct`,
        });
      } else {
        try {
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            res.status(403).json({
              success: false,
              message: `Email is not exist or password is not correct`,
            });
          }

          const payload = {
            userId: result._id,
            userName: result.firstName,
            role: result.role,
          };

          const options = {
            expiresIn: "90m",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `login successfully`,
            token: token,
            userName: result.firstName,
            userId: result._id.toString(),
          });
        } catch (error) {
          throw Error(error.message);
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
};
const googleLogin = (req, res) => {
  const token = req.body.credential;
  const CLIENT_ID = req.body.clientId;
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json(payload);
  }
  verify().catch(console.error);
};

module.exports = { register, login, googleLogin };

/* 
 {  "firstName":"aya",
  "lastName":"Shiab",
   "email":"aya@gmail.com", 
   "password":"12345678",
   "role":"6404839bbbe59c2213eb50b3"} 


 


token{
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDRjM2U1ZDYzYmIzOWExNDVkNjJlMiIsInBlcm1pc3Npb25zIjp7Il9pZCI6IjY0MDQ4MzliYmJlNTljMjIxM2ViNTBiMyIsInJvbGUiOiJVU0VSIiwicGVybWlzc2lvbnMiOlsiQUREX1RPX0ZBVk9SSVRFIiwiQUREX1RPX0NBUkQiLCJDUkVBVEVfUkVWSUVXIiwiREVMRVRFX0ZBVk9SSVRFIiwiREVMRVRFX0ZST01fQ0FSRCIsIkRFTEVURV9SRVZJRVciLCJVUERBVEVfUkVWSUVXIl0sIl9fdiI6MH0sInR5cGUiOiJVU0VSIiwiaWF0IjoxNjc4MDM3NjE3LCJleHAiOjE2NzgwNDMwMTd9.pgDoU3merGqz2bAq6Bo4_DGke6--f5PZND1E7rZt5PQ
}
*/
