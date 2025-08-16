const axios = require("axios");
const captainModel = require("../models/captain.model");
module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOMAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    }
  } catch (error) {
    console.error("Error fetching coordinates", error);
    throw new Error("Unable to fetch coordinates");
  }
};

module.exports.getDistanceAndTime = async (origin, distance) => {
  if (!origin || !distance) {
    throw new Error("origin and destination are required ");
  }
  const apiKey = process.env.GOMAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(distance)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      if (
        response.data.rows[0].elements[0].status === "NOT_FOUND" ||
        response.data.rows[0].elements[0].status === "ZERO_RESULTS"
      ) {
        return "No routes found";
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports.getSuggestions = async (input, lat, lng) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOMAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&radius=30000&location=${lat},${lng}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (
      response.data.status === "OK" ||
      response.data.status === "ZERO_RESULTS"
    ) {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
  const captains = captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 3963.2],
      },
    },
  });
  return captains;
};
