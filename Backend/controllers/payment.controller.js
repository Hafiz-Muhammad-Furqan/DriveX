const { generateSignature } = require("../utils/payFastConfig");
require("dotenv").config();

const initiatePayment = async (req, res) => {
  const { amount, userEmail } = req.body;

  const data = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    // return_url: process.env.PAYFAST_RETURN_URL,
    // cancel_url: process.env.PAYFAST_CANCEL_URL,
    // notify_url: process.env.PAYFAST_NOTIFY_URL,
    amount,
    item_name: "Ride Payment",
    email_address: userEmail,
  };

  // Signature generate
  const signature = generateSignature(data);

  // payment.controller.js mein modify karein
  const paymentUrl = `https://sandbox.payfast.co.za/eng/process
?${new URLSearchParams({
    ...data,
    signature: encodeURIComponent(signature), // Signature ko bhi encode karein
  }).toString()}`;

  // payment.controller.js mein console.log add karein
  console.log("Original Data:", data);
  console.log("Generated Signature:", signature);

  res.json({ paymentUrl }); // send to frontend
};

module.exports = { initiatePayment };
