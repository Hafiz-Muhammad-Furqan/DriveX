// const axios = require("axios");
// const captainModel = require("../models/captain.model");

// module.exports.getAddressCoordinate = async (address) => {
//   const apiKey = process.env.GOMAPS_API_KEY;
//   const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
//     address
//   )}&key=${apiKey}`;
//   try {
//     const response = await axios.get(url);
//     if (response.data.status === "OK") {
//       const location = response.data.results[0].geometry.location;
//       return {
//         ltd: location.lat,
//         lng: location.lng,
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates", error);
//     throw new Error("Unable to fetch coordinates");
//   }
// };

// module.exports.getDistanceAndTime = async (origin, distance) => {
//   if (!origin || !distance) {
//     throw new Error("origin and destination are required ");
//   }
//   const apiKey = process.env.GOMAPS_API_KEY;
//   const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
//     origin
//   )}&destinations=${encodeURIComponent(distance)}&key=${apiKey}`;
//   try {
//     const response = await axios.get(url);

//     if (response.data.status === "OK") {
//       if (
//         response.data.rows[0].elements[0].status === "NOT_FOUND" ||
//         response.data.rows[0].elements[0].status === "ZERO_RESULTS"
//       ) {
//         return "No routes found";
//       }
//       return response.data.rows[0].elements[0];
//     } else {
//       throw new Error("Unable to fetch distance and time");
//     }
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

// module.exports.getSuggestions = async (input, lat, lng) => {
//   if (!input) {
//     throw new Error("query is required");
//   }

//   const apiKey = process.env.GOMAPS_API_KEY;
//   const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//     input
//   )}&radius=30000&location=${lat},${lng}&key=${apiKey}`;
//   try {
//     const response = await axios.get(url);
//     if (
//       response.data.status === "OK" ||
//       response.data.status === "ZERO_RESULTS"
//     ) {
//       return response.data.predictions;
//     } else {
//       throw new Error("Unable to fetch suggestions");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
//   const captains = captainModel.find({
//     location: {
//       $geoWithin: {
//         $centerSphere: [[ltd, lng], radius / 3963.2],
//       },
//     },
//   });
//   return captains;
// };

const axios = require("axios");
const captainModel = require("../models/captain.model");

const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
if (!SERPAPI_KEY) {
  throw new Error("SERPAPI_KEY missing. Set it in your environment.");
}

const serp = axios.create({
  baseURL: "https://serpapi.com",
  timeout: 15000,
});

const buildLL = (lat = 24.8607, lng = 67.0011, zoom = 14) => {
  if (lat == null || lng == null) return undefined;
  return `@${lat},${lng},${zoom}z`;
};

module.exports.getAddressCoordinate = async (address) => {
  if (!address) throw new Error("address is required");
  try {
    const { data } = await serp.get("/search.json", {
      params: {
        engine: "google_maps",
        type: "search",
        q: address,
        api_key: SERPAPI_KEY,
      },
    });

    if (data?.search_metadata?.status !== "Success") {
      throw new Error(data?.error || "SerpApi search failed");
    }

    const place =
      data.place_results ||
      (Array.isArray(data.local_results) ? data.local_results[0] : null);

    const gps = place?.gps_coordinates;
    if (!gps) {
      throw new Error("No coordinates found for this address");
    }

    return {
      ltd: gps.latitude,
      lng: gps.longitude,
    };
  } catch (error) {
    console.error(
      "Error fetching coordinates (SerpApi):",
      error?.response?.data || error.message
    );
    throw new Error("Unable to fetch coordinates");
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("origin and destination are required");
  }
  try {
    const { data } = await serp.get("/search.json", {
      params: {
        engine: "google_maps_directions",
        start_addr: origin,
        end_addr: destination,
        distance_unit: 0,
        api_key: SERPAPI_KEY,
      },
    });

    if (data?.search_metadata?.status !== "Success") {
      throw new Error(data?.error || "SerpApi directions failed");
    }

    const dir = Array.isArray(data.directions) ? data.directions[0] : null;
    if (!dir) {
      return "No routes found";
    }

    return {
      distance: {
        text: dir.formatted_distance,
        value: dir.distance,
      },
      duration: {
        text: dir.formatted_duration,
        value: dir.duration,
      },
      travel_mode: dir.travel_mode,
      status: "OK",
    };
  } catch (error) {
    console.error(
      "Error fetching distance/time (SerpApi):",
      error?.response?.data || error.message
    );
    throw new Error("Unable to fetch distance and time");
  }
};

module.exports.getSuggestions = async (input, lat, lng) => {
  if (!input) {
    throw new Error("query is required");
  }
  try {
    const ll = buildLL(lat, lng, 14);
    if (!ll) throw new Error("lat and lng are required for autocomplete");

    const { data } = await serp.get("/search.json", {
      params: {
        engine: "google_maps_autocomplete",
        q: input,
        ll,
        api_key: SERPAPI_KEY,
      },
    });

    if (data?.search_metadata?.status !== "Success") {
      throw new Error(data?.error || "SerpApi autocomplete failed");
    }

    return data.suggestions || [];
  } catch (error) {
    console.error(
      "Error fetching suggestions (SerpApi):",
      error?.response?.data || error.message
    );
    throw new Error("Unable to fetch suggestions");
  }
};

module.exports.getCaptainsInRadius = async (lat, lng, radiusInMiles) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radiusInMiles / 3963.2],
      },
    },
  });

  return captains;
};
