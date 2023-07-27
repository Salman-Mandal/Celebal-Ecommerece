const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/ordercontroller");
const { isAuthenticatedUser, isAuthorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser,isAuthorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,isAuthorizeRoles("admin"),deleteOrder);


module.exports = router; 