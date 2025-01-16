const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { body, query } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isIn(["Car", "Auto", "Bike"])
      .withMessage("Invalid vehicle type"),
    body("fare"),
  ],
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  rideController.getFare
);

router.post(
  "/accept",
  authMiddleware.authCaptain,
  [
    body("rideId").isMongoId().withMessage("Invalid ride ID"),
    body("captainId").isMongoId().withMessage("Invalid driver ID"),
  ],
  rideController.acceptRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride ID"),
  query("otp")
    .isLength({ min: 6, max: 6 })
    .isString()
    .withMessage("Invalid OTP"),
  rideController.startRide
);
module.exports = router;
