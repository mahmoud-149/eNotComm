const express = require("express");
const {
  get_products,
  get_product_by_id,
  add_product,
  delete_product,
  uptade_products,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(get_products).post(add_product);
router
  .route("/:productId")
  .get(get_product_by_id)
  .delete(delete_product)
  .patch(uptade_products);
router;

module.exports = { products_routes: router };
