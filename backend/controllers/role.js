const roleModel = require("../models/roleSchema");

const createRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions
  });

  newRole
    .save()
    .then((role) => {
      res.status(201).json({
        success: true,
        message: `role added`,
        role: role,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { createRole };

/* 
{
  "role": "USER",
  "permissions": ["ADD_TO_FAVORITE","ADD_TO_CARD","CREATE_REVIEW","DELETE_FAVORITE","DELETE_FROM_CARD","DELETE_REVIEW","UPDATE_REVIEW"]
}
 */
