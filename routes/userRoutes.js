const express = require("express");
const { check_role } = require("../middlewares/checkRole");
const {
  users,
  updateUser,
  deleteUser,
  viewUser,
  viewAllUsers,
} = require("../controllers/users");
const { signup, login } = require("../controllers/auth");

const router = express.Router();

router.route("/").get(viewAllUsers);

router
  .route("/:userEmail")
  .get(viewUser)
  .patch(check_role, updateUser)
  .delete(check_role, deleteUser);

module.exports = {
  users_routes: router,
};
