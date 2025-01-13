import axios from "axios";

const fetchFare = async (locations) => {
  console.log(locations);

  try {
    const fare = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: locations.pickUpLocation,
          destination: locations.destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return fare.data;
  } catch (error) {
    console.error("Failed to fetch fare:", error.message);
  }
};

export default fetchFare;
