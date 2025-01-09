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
