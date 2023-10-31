// const { instance }  =require("../server.js");
// import crypto from "crypto";
const crypto = require("crypto");
const Payment = require("../model/razorPayModel")
const dotenv = require("dotenv");
// const Razorpay = require("razorpay");
const Razorpay = require("razorpay")

//config =>
dotenv.config({path : "backend/config/config.env"})

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});



exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try{
  // const order = await instance.orders.create(options);
  const order = await instance.orders.create(options);
  console.log(order);

  res.status(200).json({
    success: true,
    order,
  });

}catch(error) {
  console.error('Error creating Razorpay order:', error);
  res.status(500).json({
    success: false,
    error: 'Error creating Razorpay order',
  });
}
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  console.log(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

   const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    console.log(razorpay_signature);

    res.status(200).json({
      success:true,
      payment
    })

    

    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};







// const Razorpay = require('razorpay');
// require('dotenv').config({ path: './config/.env' });


// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_APT_SECRET,
// });

// // Create a new order
// const createOrder = (req, res) => {
//   const { amount } = req.body;

//   const orderOptions = {
//     amount, // Amount in paise
//     currency: 'INR',
//   };

//   razorpay.orders.create(orderOptions, (error, order) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Error creating order' });
//     }

//     return res.json({ order });
//   });
// };

// // Handle Razorpay callback (payment success or failure)
// const handleCallback = (req, res) => {
//   const { orderId, paymentId, signature } = req.body;

//   // Verify the payment and update order status
//   // Handle payment response here

//   return res.json({ success: true });
// };

// module.exports = {
//   createOrder,
//   handleCallback,
// };

