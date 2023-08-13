const catchAsyncErrors = require("../middleware/catchAsyncError");
const Razorpay = require('razorpay');
const ErrorHandler = require("../utils/errorhandler");
require("dotenv").config();
const crypto = require("crypto");

const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRET })




exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });
});

exports.Paymentvarify = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        // console.log(generated_signature);
        // console.log(razorpay_signature);


        const isAuthentic = generated_signature == razorpay_signature;

        if (isAuthentic) {
            res.status(200).json({
                success: true,
                PaymentStatus: "succeeded"
            });
        } else {
            next(new ErrorHandler("Payment failed", 400));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};





exports.sendKey = async (req, res, next) => {
    try {

        // res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
        res.status(200).json({
            key: process.env.RAZORPAY_API_KEY
        });
    } catch (error) {
        next(error);
    }
};