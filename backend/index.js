const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const productsRouter = require("./routes/product");
const rolesRouter = require("./routes/role");
const usersRouter = require("./routes/user");


app.use(cors());
app.use(express.json());

//endpoint for each router
app.use("/products", productsRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter );


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
