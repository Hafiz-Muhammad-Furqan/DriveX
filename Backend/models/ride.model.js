const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ["Car", "Bike", "Auto"],
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "completed", "cancelled", "ongoing"],
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
    enum: ["unpaid", "paid"],
  },
  captainsNotified: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model("ride", rideSchema);
