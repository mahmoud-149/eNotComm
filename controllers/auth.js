// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "data is missing",
    });
  }

  const checkExistUser = await userSchema.findOne({ email });
  if (checkExistUser) {
    return res.status(409).json({
      status: 409,
      message: "user already exist",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await userSchema({
    name,
    email,
    password: encryptedPassword,
  });
  await user.save();

  return res.status(201).json({
    status: 201,
    message: "user created",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "data is missing",
    });
  }
  const checkLoggedUser = await userSchema.findOne({ email });
  if (!checkLoggedUser) {
    return res.status(401).json({
      status: 401,
      message: "invalid email",
    });
  }
  const checkPassword = await bcrypt.compare(
    password,
    checkLoggedUser.password
  );
  if (!checkPassword) {
    return res.status(401).json({
      status: 401,
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      email,
      name: checkLoggedUser.name,
      role: checkLoggedUser.role,
      _id: checkLoggedUser._id,
    },
    process.env.SECRET_KEY
  );

  console.log(token);

  return res.status(201).json({
    status: 201,
    data: { token, message: "login successful" },
  });
};

module.exports = {
  signup,
  login,
};
