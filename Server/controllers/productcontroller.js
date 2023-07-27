const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");


// create product


exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// getall products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 20;
    const productCount = await Product.countDocuments();
    const apifeatures = new Apifeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);


    const product = await apifeatures.query;
    res.status(200).json({
        message: "xxx",
        product
    });
});

// update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })

});
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("product not found", 404));
        }

        await product.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("product not found", 404));
        }
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        // if (err.name === "CastError") {
        //         return next(new ErrorHandler("watermelon suger",5));
        //     };
        if (error.name === "CastError") {
            return next(error);
        }



        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
});


//create reveiw or update reveiw

exports.createProductReview = catchAsyncError(
    async (req, res, next) => {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            Comment:comment
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
        if (isReviewed) {

            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString())
                    rev.rating = rating,
                        rev.Comment = comment
            })

        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        } 

        let avg = 0;

        product.reviews.forEach(rev => {
            avg += rev.rating;
        });

        product.rating = avg / product.reviews.length;

        await product.save({
            validateBeforeSave: false
        });

        res.status(200).json({
            success: true,
        })
    }
)

//Get all reviews of a product

exports.getProductReviews = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        })
    }
)

// Delete Review
exports.deleteReview = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productId);
        const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

        let avg = 0;

        reviews.forEach(rev => {
            avg += rev.rating;
        });

        const rating = avg / reviews.length;

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId,
            {
                reviews,
                rating,
                numOfReviews
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        )

        res.status(200).json({
            success: true,
            message: "Review deleted Successfully"
        })
    }
)

