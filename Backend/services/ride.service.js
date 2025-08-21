const captainModel = require("../models/captain.model");
const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

module.exports.getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceAndTime = await mapService.getDistanceAndTime(
    pickup,
    destination
  );
  if (distanceAndTime === "No routes found") {
    return "No routes found";
  }

  const baseFare = {
    auto: 50,
    car: 80,
    bike: 20,
  };
  const perKmRate = {
    auto: 33,
    car: 40,
    bike: 15,
  };
  const perMinuteRate = {
    auto: 1,
    car: 1.8,
    bike: 0.7,
  };

  const fare = {
    Auto:
      baseFare.auto +
      (distanceAndTime.distance.value / 1000) * perKmRate.auto +
      (distanceAndTime.duration.value / 60) * perMinuteRate.auto,
    Car:
      baseFare.car +
      (distanceAndTime.distance.value / 1000) * perKmRate.car +
      (distanceAndTime.duration.value / 60) * perMinuteRate.car,
    Bike:
      baseFare.bike +
      (distanceAndTime.distance.value / 1000) * perKmRate.bike +
      (distanceAndTime.duration.value / 60) * perMinuteRate.bike,
  };
  return fare;
};

const getOtp = (num) => {
  const generateOtp = (num) => {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  };
  return generateOtp(num);
};

module.exports.createRide = async ({
  destination,
  user,
  pickup,
  vehicleType,
  fare,
}) => {
  if (!pickup || !destination || !user || !vehicleType || !fare) {
    throw new Error("All fields are required");
  }

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare,
    vehicleType,
    otp: getOtp(6),
  });
  return ride;
};

module.exports.acceptRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("All fields is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captainId,
    }
  );
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  await captainModel.findByIdAndUpdate(captainId, { status: "busy" });

  return ride;
};

module.exports.startRide = async ({ rideId, otp }) => {
  if (!rideId || !otp) {
    throw new Error("RideId and otp  are required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride  not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid otp");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );
  return ride;
};

module.exports.finishRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("RideId and captainId is required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captainId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  if (ride.captain) {
    ride.captain.totalRides = (ride.captain.totalRides || 0) + 1;
    await ride.captain.save();
  }
  return ride;
};
