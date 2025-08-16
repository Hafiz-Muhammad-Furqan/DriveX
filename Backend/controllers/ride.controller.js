const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sendMessageToSockedId } = require("../socket");
const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { destination, pickup, vehicleType, fare, rideId } = req.body;

  try {
    let ride;

    if (!rideId) {
      ride = await rideService.createRide({
        destination,
        user: req.user._id,
        pickup,
        vehicleType,
        fare: Math.round(fare),
      });
    } else {
      ride = await rideModel.findById(rideId);
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
    }

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const { ltd, lng } = pickupCoordinates;

    const captainRadius = await mapService.getCaptainsInRadius(ltd, lng, 5000);

    const availableCaptains = captainRadius.filter(
      (captain) =>
        captain.vehicle && captain.vehicle.vehicleType === vehicleType
    );

    if (availableCaptains.length === 0) {
      return res
        .status(404)
        .json({ message: "No drivers available in your area" });
    }

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    const alreadyNotified = ride.captainsNotified || [];
    const newCaptainIds = [];
    const successfulNotifications = [];

    for (const captain of availableCaptains) {
      try {
        const currentCaptain = await captainModel.findById(captain._id);
        if (!currentCaptain || !currentCaptain.socketId) {
          console.log(`Captain ${captain._id} has no active socket connection`);
          continue;
        }

        const success = sendMessageToSockedId(currentCaptain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });

        if (success) {
          successfulNotifications.push(captain._id.toString());
          console.log(`Successfully notified captain ${captain._id}`);
        } else {
          console.log(`Failed to notify captain ${captain._id}`);
        }

        if (!alreadyNotified.includes(captain._id.toString())) {
          newCaptainIds.push({
            captainId: captain._id.toString(),
            socketId: currentCaptain.socketId,
            notifiedAt: new Date(),
            success: success,
          });
        }
      } catch (error) {
        console.error(`Error notifying captain ${captain._id}:`, error);
      }
    }

    ride.captainsNotified = [...alreadyNotified, ...newCaptainIds];
    ride.notificationStats = {
      totalCaptains: availableCaptains.length,
      successfulNotifications: successfulNotifications.length,
      lastNotificationAt: new Date(),
    };
    await ride.save();

    console.log(
      `Ride ${ride._id}: Notified ${successfulNotifications.length}/${availableCaptains.length} captains`
    );

    res.status(200).json({
      ...ride.toObject(),
      notificationStats: {
        totalCaptains: availableCaptains.length,
        notifiedSuccessfully: successfulNotifications.length,
      },
    });
  } catch (error) {
    console.error("Error in createRide:", error);
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
    res.status(500).json({ message: error.message });
  }
};

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, captainId } = req.body;

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

module.exports.cancelRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await rideModel.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.status === "cancelled") {
      return res.status(400).json({ message: "Ride is already cancelled" });
    }

    ride.status = "cancelled";
    await ride.save();

    ride.captainsNotified.forEach((captain) => {
      sendMessageToSockedId(captain.socketId, {
        event: "ride-cancelled",
        data: { rideId },
      });
    });

    res.status(200).json({ message: "Ride cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
