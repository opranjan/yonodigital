// const asyncWrapper = require("../middleWare/asyncWrapper");

// // process the payment
// exports.processPayment = asyncWrapper(async (req, res, next) => {
//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // asigning key as well

//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.ammount,
//     currency: "inr",
//     metadata: {
//       company: "Ecommerce", // not mandatory
//     },
//   });

//   res
//     .status(200)
//     .json({ sucess: true, client_secret: myPayment.client_secret });
// });

// // send STRIPE_API_KEY to user =>

// exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });





const Razorpay = require("razorpay");
const { isAuthenticatedUser } = require("../middleWare/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise (Razorpay expects amount in paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.order_id === orderId && payment.status === "captured") {
      // Payment was successful
      res.status(200).json({ success: true });
    } else {
      // Payment failed
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getRazorpayKey = (req, res) => {
  // Replace this with your actual Razorpay API key
  const razorpayAPIKey = process.env.RAZORPAY_API_KEY;

  // Send the API key to the frontend
  res.json({ razorpayKeyId: razorpayAPIKey });
};

