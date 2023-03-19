const authorization = (text) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(text)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };
};

module.exports = authorization;
