const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create new order
exports.newOrder = catchAsyncError(
    async (req, res, next) => {
        try {

            const {
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            } = req.body;

            const order = await Order.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                paidAt: Date.now(),
                user: req.user._id,
            });


            res.status(201).json({
                success: true,
                order
            })

        } catch (error) {
            console.log(error);
            next(error);

        }
    }
)

// get single order
exports.getSingleOrder = catchAsyncError(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        res.status(200).json({
            success: true,
            order
        })
    }

);

// logged-in User order
exports.myOrders = catchAsyncError(
    async (req, res, next) => {
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            orders
        })

    }
);
// Get all orders --admin
exports.getAllOrders = catchAsyncError(
    async (req, res, next) => {
        const orders = await Order.find().populate({
            path: "user",
            select: ["name", "email"]
        });

        let price = 0;
        orders.forEach(order => price += order.totalPrice);
        res.status(200).json({
            success: true,
            TotalPrice: price,
            orders
        })

    }
);

// Update order status --admin
exports.updateOrder = catchAsyncError(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("You have already delivered this order", 404));
        }

        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        });

        order.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });

    }
);

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false })

}

exports.deleteOrder = catchAsyncError(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 404));
        }

        await order.deleteOne();

        res.status(200).json({
            success: true,
        })
    }
)