const express = require("express");
const router = express.Router();
const { initiatePayment } = require("../controllers/payment.controller");

router.post("/pay", initiatePayment);

module.exports = router;
