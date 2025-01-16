const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sendMessageToSockedId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { destination, pickup, vehicleType, fare } = req.body;
  try {
    const ride = await rideService.createRide({
      destination,
      user: req.user._id,
      pickup,
      vehicleType,
      fare: Math.round(fare),
    });
    res.status(201).json(ride);
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const { ltd, lng } = pickupCoordinates;
    const captainRadius = await mapService.getCaptainsInRadius(ltd, lng, 5000);
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainRadius.map((captain) => {
      sendMessageToSockedId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.acceptRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, captainId } = req.body;

  try {
    const ride = await rideService.acceptRide(rideId, captainId);
    sendMessageToSockedId(ride.user.socketId, {
      event: "ride-accepted",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });
    sendMessageToSockedId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, captainId } = req.body;
  console.log(rideId, captainId);

  try {
    const ride = await rideService.finishRide(rideId, captainId);
    sendMessageToSockedId(ride.user.socketId, {
      event: "ride-finished",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
