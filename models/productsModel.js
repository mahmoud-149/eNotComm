const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },

  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
});

module.exports = mongoose.model("products", productSchema);
