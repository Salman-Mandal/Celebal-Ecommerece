const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModels");
require("dotenv").config();
// const JWT_SECRET = "SJGHKERUDXMNDVDF354687DKFHGK";


exports.isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {

        // console.log("hi1");
        const { token } = req.cookies;
        
        if (!token) {
            return next(new ErrorHandler("Please login to perform this action", 401));
        }
        
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    }
    );
    
    exports.isAuthorizeRoles = (...roles) => {
        return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`You are just a ${req.user.role} , you can't perform this action`, 400));
        }
    

        next()
    }

}
