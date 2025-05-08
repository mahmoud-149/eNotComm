const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { products_routes } = require("./routes/productRoutes");
const mongoose = require("mongoose");

const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/products", products_routes);

app.use((req, res) => {
  res.status(500).json({
    status: 500,
    data: { data: null, message: "Route not found" },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running");
});
// module.exports = app;
