const express = require("express");
const { processPayment, sendKey, Paymentvarify } = require("../controllers/paymentController");



const router = express.Router();

router.route("/checkout").post(processPayment);
router.route("/getkey").get(sendKey);

router.route("/paymentverification").post(Paymentvarify);

module.exports = router;