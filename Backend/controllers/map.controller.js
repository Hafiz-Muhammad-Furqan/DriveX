const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("map controller error" + error);
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceAndTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceAndTime = await mapService.getDistanceAndTime(
      origin,
      destination
    );
    res.status(200).json(distanceAndTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error calculating distance and time" });
  }
};

module.exports.getSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting suggestions" });
  }
};
