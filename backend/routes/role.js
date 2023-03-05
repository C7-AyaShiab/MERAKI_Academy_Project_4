const express = require("express");

//import role from controllers
const { createRole } = require("../controllers/role");

//create roles router
const rolesRouter = express.Router();

// http://localhost:5000/roles/
rolesRouter.post("/", createRole);

module.exports = rolesRouter;
