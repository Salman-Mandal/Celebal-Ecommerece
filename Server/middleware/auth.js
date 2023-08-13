const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModels");
require("dotenv").config();

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader);
 
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new ErrorHandler("Please login to perform this action", 401));
  }
 
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return next(new ErrorHandler("Please login to perform this action", 401));
  }
  
  
 
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Please login to perform this action", 401));
  }
});

exports.isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `You are just a ${req.user.role}, you can't perform this action`,
          400
        )
      );
    }

    next();
  };
};
