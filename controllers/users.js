const User = require("../models/userModel");

const updateUser = async (req, res) => {
  const { userEmail } = req.params;
  const updateData = { ...req.body };

  const updatedUser = await User.findOneAndUpdate(
    { email: userEmail },
    updateData
  );

  if (!updatedUser) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: 200,
    data: { data: updatedUser, message: "User updated successfully" },
  });
};

const deleteUser = async (req, res) => {
  const { userEmail } = req.params;

  const deletedUser = await User.findOneAndDelete({ email: userEmail });

  if (!deletedUser) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "User deleted successfully",
    data: deletedUser,
  });
};

const viewUser = async (req, res) => {
  const { userEmail } = req.params;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: 200,
    data: { data: user, message: "User found successfully" },
  });
};

const viewAllUsers = async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({
    status: 200,
    data: { data: users, message: "Users found successfully" },
  });
};

module.exports = {
  updateUser,
  deleteUser,
  viewUser,
  viewAllUsers,
};
