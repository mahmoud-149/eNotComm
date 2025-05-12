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

router.route("/").get(users);

router.route("/viewallusers").get(check_role,viewAllUsers);

router.route("/viewuser").get(viewUser);

router.route("/update").put(check_role, updateUser);

router.route("/delete").put(check_role, deleteUser);

router.route("/signup").post(signup);

router.route("/login").post(login);

module.exports = {
  users_routes: router,
};
