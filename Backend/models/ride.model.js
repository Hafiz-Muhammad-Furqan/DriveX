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
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", " ongoing", "completed", "cancelled"],
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
  captainsNotified: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model("ride", rideSchema);
