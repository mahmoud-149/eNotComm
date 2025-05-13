const productSchema = require("../models/productsModel");
const mongoose = require("mongoose");

const get_products = async (req, res) => {
  const products = await productSchema.find({});
  return res.status(200).json({
    status: 200,
    data: { data: products, message: "Products fetched successfully" },
  });
};

const get_product_by_id = async (req, res) => {
  const { productId } = req.params;

  const product = await productSchema.findById(productId);

  if (!product) {
    return res.status(404).json({
      status: 404,
      data: { data: null, message: "Product not found" },
    });
  }

  return res.status(200).json({
    status: 200,
    data: { data: product, message: "Product fetched successfully" },
  });
};

const add_product = async (req, res) => {
  const { title, price, description, category, image, rating } = req.body;

  if (!title || !price || !description || !image || !category) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "Please provide all the required fields" },
    });
  }

  const productExists = await productSchema.findOne({ title, category });
  if (productExists) {
    return res.status(409).json({
      status: 409,
      data: { data: null, message: "Product already exists" },
    });
  }

  const newProduct = await productSchema.create({
    title,
    price,
    description,
    category,
    image,
    rating: {
      rate: rating?.rate || 0,
      count: rating?.count || 0,
    },
  });

  return res.status(201).json({
    status: 201,
    data: { data: newProduct, message: "Product added successfully" },
  });
};

const delete_product = async (req, res) => {
  const { productId } = req.params;
  const product = await productSchema.findByIdAndDelete(productId);
  if (!product) {
    return res.status(404).json({
      status: 404,
      data: { data: null, message: "product not found" },
    });
  }
  return res.status(200).json({
    status: 200,
    data: { data: null, message: "product deleted successfully" },
  });
};

const uptade_products = async (req, res) => {
  const { productId } = req.params;
  const uptateKeys = { ...req.body };
  const uptadedProducts = await productSchema.findByIdAndUpdate(
    productId,
    uptateKeys
  );
  if (!uptadedProducts) {
    return res.status(404).json({
      status: 404,
      data: { data: null, message: "product not found" },
    });
  }
  return res.status(200).json({
    status: 200,
    data: { data: uptadedProducts, message: "product updated successfully" },
  });
};

module.exports = {
  get_products,
  get_product_by_id,
  add_product,
  delete_product,
  uptade_products,
};
