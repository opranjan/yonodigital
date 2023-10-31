const express = require("express");

const { checkout, paymentVerification } = require("../controller/razorpayPaymentController.js");

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

// export default router;

module.exports = router



// const express = require('express');
// const router = express.Router();
// const razorpayController = require('../controller/razorpayPaymentController');

// // Create a new order
// router.post('/create-order', razorpayController.createOrder);

// // Handle Razorpay callback
// router.post('/callback', razorpayController.handleCallback);

// module.exports = router;



