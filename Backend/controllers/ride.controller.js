const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sendMessageToSockedId } = require("../socket");
const rideModel = require("../models/ride.model");

const mongoose = require("mongoose");

// module.exports.createRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { destination, pickup, vehicleType, fare, ride } = req.body;
//   try {
//     if (!ride) {
//       ride = await rideService.createRide({
//         destination,
//         user: req.user._id,
//         pickup,
//         vehicleType,
//         fare: Math.round(fare),
//       });
//     }
//     const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
//     const { ltd, lng } = pickupCoordinates;
//     const captainRadius = await mapService.getCaptainsInRadius(ltd, lng, 5000);

//     const rideWithUser = await rideModel
//       .findOne({ _id: ride._id })
//       .populate("user");

//     const notifiedCaptains = captainRadius
//       .filter((captain) => captain.vehicle.vehicleType === vehicleType)
//       .map((captain) => {
//         sendMessageToSockedId(captain.socketId, {
//           event: "new-ride",
//           data: rideWithUser,
//         });
//         return captain._id.toString();
//       });

//     ride.captainsNotified = notifiedCaptains;
//     await ride.save();

//     res.status(200).json(ride);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { destination, pickup, vehicleType, fare, ride } = req.body;

  try {
    if (!ride) {
      ride = await rideService.createRide({
        destination,
        user: req.user._id,
        pickup,
        vehicleType,
        fare: Math.round(fare),
      });
    }

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const { ltd, lng } = pickupCoordinates;

    const captainRadius = await mapService.getCaptainsInRadius(ltd, lng, 5000);

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    const alreadyNotified = ride.captainsNotified || [];

    const newCaptainIds = [];

    captainRadius.forEach((captain) => {
      if (captain.vehicle.vehicleType === vehicleType) {
        sendMessageToSockedId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });

        if (!alreadyNotified.includes(captain._id.toString())) {
          newCaptainIds.push({
            captainId: captain._id.toString(),
            socketId: captain.socketId,
          });
        }
      }
    });

    ride.captainsNotified = [...alreadyNotified, ...newCaptainIds];
    await ride.save();

    res.status(200).json(ride);
  } catch (error) {
    console.error(error);
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
