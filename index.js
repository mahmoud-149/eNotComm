const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const { products_routes } = require("./routes/productRoutes");
const { users_routes } = require("./routes/userRoutes");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err.message);
  });

app.use("/api/products", products_routes);
app.use("/api/users", users_routes);

app.use((req, res) => {
  return res.status(404).json({
    status: 404,
    data: { data: null, message: "Route not found" },
  });
});

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log("server running");
// });

module.exports = app;
