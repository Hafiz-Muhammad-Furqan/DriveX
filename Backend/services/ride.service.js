const { log } = require("console");
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
  console.log({ destination, user, pickup, vehicleType, fare });
  if (!pickup || !destination || !user || !vehicleType || !fare) {
    throw new Error("All fields are required");
  }

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare,
    otp: getOtp(6),
  });
  return ride;
};
