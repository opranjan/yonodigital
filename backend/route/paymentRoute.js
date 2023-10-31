const express = require("express");
// const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { processPayment, verifyPayment,getRazorpayKey } = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");
const router  = express.Router();



// router.route("/payment/process").post(isAuthentictedUser , processPayment);

// router.route("/stripeapikey").get(sendStripeApiKey);


// Import the controller function

// Set up the route
router.get('/getRazorpayKey', getRazorpayKey);



router.post("/payment/process", processPayment);
router.post("/payment/verify", verifyPayment);

module.exports = router