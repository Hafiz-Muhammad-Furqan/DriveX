const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  confirmPayment,
} = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create-intent", authMiddleware.authUser, createPaymentIntent);
router.post("/confirm-payment", authMiddleware.authUser, confirmPayment);

module.exports = router;
