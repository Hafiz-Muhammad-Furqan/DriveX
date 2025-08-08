const express = require("express");
const {
  handleCreatePaymentIntent,
} = require("../controllers/payment.controller.js");
const router = express.Router();

router.post("/create-payment-intent", handleCreatePaymentIntent);

module.exports = router;
