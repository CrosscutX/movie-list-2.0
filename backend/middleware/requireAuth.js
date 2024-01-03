const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization) {
  //   res.status(401).json({ error: "Auth token required" });
  // }
  // const token = authorization.split(" ")[1];
  // try {
  //   const { _id } = jwt.verify(token, process.env.SECRET);
  //   req.user = User.findOne({ _id }).select("_id");
  //   console.log(_id);
  //   next();
  // } catch (error) {
  //   res.status(401).json({ error: "Request not authorized" });
  // }
  next();
};

module.exports = requireAuth;
