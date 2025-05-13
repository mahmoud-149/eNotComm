
const check_role = async (req, res, next) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];
  const role = token.split(" ")[1];
  if (role == "admin") {
    return next();
  }
  return res.status(401).json({
    statues: 401,
    data: {
      data: null,
      message: "You are not authorized to perform this action",
    },
  });
};

module.exports = { check_role };

