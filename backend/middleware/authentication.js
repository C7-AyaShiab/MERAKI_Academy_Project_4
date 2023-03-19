const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: "forbidden",
      });
    }
    const token = req.headers.authorization.split(" ").pop();
    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "token is not valid",
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = authentication;
