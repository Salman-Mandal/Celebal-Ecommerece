const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productcontroller");
const { isAuthenticatedUser, isAuthorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(  getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);



module.exports = router;