import axios from "axios";
import showToast from "./Toast.js";

const fetchFare = async (locations) => {
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
    showToast("Error fetching fare please try later", "error");
  }
};

export default fetchFare;
