const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceAndTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  query("lat").optional().isFloat({ min: -90, max: 90 }),
  query("lng").optional().isFloat({ min: -180, max: 180 }),
  authMiddleware.authUser,
  mapController.getSuggestions
);

module.exports = router;
