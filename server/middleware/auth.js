const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

//auth middleware
exports.auth = async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  //if token missing
  if (!token) throw new UnauthenticatedError("Token is missing");
  //verify the token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
  } catch (error) {
    throw new UnauthenticatedError("token is invalid");
  }
  next();
};

//isStudent
exports.isStudent = async (req, res, next) => {
  if (req.user.accountType !== "student")
    throw new UnauthenticatedError(
      "This is a protected route for students only"
    );
  next();
};
//isAdmin
exports.isAdmin = async (req, res, next) => {
  if (req.user.accountType !== "admin")
    throw new UnauthenticatedError("This is a protected route for admins only");
  next();
};
//is Instructor
exports.isInstructor = async (req, res, next) => {
  if (req.user.accountType !== "instructor")
    throw new UnauthenticatedError(
      "This is a protected route for instructors only"
    );
  next();
};
