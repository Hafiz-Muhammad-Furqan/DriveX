const rideModel = require("../models/ride.model");
const stripe = require("../services/stripe.service");
const { sendMessageToSockedId } = require("../socket");

module.exports.createPaymentIntent = async (req, res) => {
  const { rideId } = req.body;

  try {
    const ride = await rideModel.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.paymentStatus === "paid") {
      return res.status(400).json({ message: "Fare already paid" });
    }

    const amountInPaise = Math.round(ride.fare * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "pkr",
      metadata: {
        rideId: ride._id.toString(),
      },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("createPaymentIntent error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.confirmPayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    if (!paymentIntentId) {
      return res.status(400).json({ message: "paymentIntentId is required" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not succeeded yet" });
    }

    const rideId = paymentIntent.metadata?.rideId;
    if (!rideId) {
      return res.status(400).json({ message: "rideId missing in metadata" });
    }

    const ride = await rideModel
      .findByIdAndUpdate(
        rideId,
        {
          paymentStatus: "paid",
          paymentId: paymentIntent.id,
        },
        { new: true }
      )
      .populate("captain");

    ride.captain.totalEarned = (ride.captain.totalEarned || 0) + ride.fare;
    await ride.captain.save();

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.captain?.socketId) {
      sendMessageToSockedId(ride.captain.socketId, {
        event: "payment-received",
        data: ride,
      });
    }

    return res.json({
      message: "Payment confirmed and captain notified",
      status: "success",
    });
  } catch (err) {
    console.error("confirmPayment error:", err);
    return res.status(500).json({ error: err.message });
  }
};
