const { createPaymentIntent } = require("../services/stripe.service.js");

module.exports.handleCreatePaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // frontend se amount ayega
    const paymentIntent = await createPaymentIntent(amount);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Payment Intent Error:", err);
    res.status(500).json({ error: err.message });
  }
};
