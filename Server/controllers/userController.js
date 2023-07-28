const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const { sendToken } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary=require("cloudinary");


//Register a user

exports.registerUser = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avaters",
            width: 150,
            crop: "scale",
          });

          const public_id = myCloud.public_id;
    const url = myCloud.secure_url;


        const user = await User.create({
            name,
            email,
            password,
            avater: {
                public_id,
                url,
            }
        });
        sendToken(user, res, 200);
    }

)

exports.getUser = catchAsyncError(
    async (req, res, next) => {
        let user = await User.find();
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        return res.status(201).json({
            success: true,
            user
        })
    }
);

exports.loginUser = catchAsyncError(
    async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password"), 401);
        }
        const isPassWordMatched = await user.comparePassword(password);


        if (!isPassWordMatched) {
            return next(new ErrorHandler("Invalid email or password"), 401);
        }

        sendToken(user, res, 200);
    }
)
exports.logoutUser = catchAsyncError(

    async (req, res, next) => {
        res.status(200).cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) }).json({
            success: true,
            message: "LoggedOut Successfully"
        })
    }
)

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    // console.log(``);

    if (!user) {
        return next(new ErrorHandler("User not Found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });


    // const resentPasswordUrl=`http://localhost:3000/api/v1/password/${resetToken}`;

    const resentPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password Token is :- \n\n ${resentPasswordUrl}  \n\n if you have not requested this email than, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email send to ${req.body.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

})

// Rseset password

exports.resetPassword = catchAsyncError(
    async (req, res, next) => {

        const token = req.params.token;

        resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
        }
        if (req.body.password !== req.body.confirmpassword) {
            return next(new ErrorHandler("Password does not match", 400));
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();


        sendToken(user, res, 200);
    }
)
// get user deatils
exports.getUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        })
    }
)
// update user password
exports.updatePassword = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id).select("+password");
        const isPassWordMatched = await user.comparePassword(req.body.oldpassword);


        if (!isPassWordMatched) {
            return next(new ErrorHandler("Oldpassword is  incorrect"), 401);
        }
        if (req.body.newpassword !== req.body.confirmpassword) {
            return next(new ErrorHandler("Password does not match", 400));
        }
        user.password = req.body.newpassword;
        await user.save();


        sendToken(user, res, 200);
    }
)

//update user profile
exports.updateProfile = catchAsyncError(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })


        res.status(200).json({
            success: true,
            newUserData
        });
    }
)

// get all users(admin)

exports.getAllUsers = catchAsyncError(
    async (req, res, next) => {

        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });
    }
)

//Get single user (admin)
exports.getSingleUser = catchAsyncError(
    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`User not found with id-${req.params.id}`), 401);
        }

        res.status(200).json({
            success: true,
            user
        });
    }
)

// update user role (admin)

exports.updateUserRole = catchAsyncError(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }



        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        if (!user) {
            return next(new ErrorHandler(`User not found with id ${req.params.id}`, 400));
        }
        res.status(200).json({
            success: true,
            user
        });
    }
)

// delete a user(admin)
exports.deleteUser = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`User not found with id ${req.params.id}`, 400));
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
    }
)





