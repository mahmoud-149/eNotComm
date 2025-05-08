const express = require("express");
const {
  get_products,
  get_product_by_id,
  add_product,
  delete_product,
  uptade_products,
} = require("../controllers/products");
const { check_role } = require("../middlewares/checkRole");

const router = express.Router();

router.route("/").get(get_products).post(check_role, add_product);
router
  .route("/:productId")
  .get(get_product_by_id)
  .delete(check_role, delete_product)
  .patch(check_role, uptade_products);
router;

module.exports = { products_routes: router };
