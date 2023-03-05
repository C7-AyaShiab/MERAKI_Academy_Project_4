 
const authorization = (text) => {
  return (req, res, next) => {
    console.log(req)
    if (!req.token.permissions.permissions.includes(text)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };
};

module.exports =  authorization;
