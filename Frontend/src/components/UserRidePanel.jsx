import { toast } from "react-toastify";
import fetchFare from "../utilities/getFare.js";
import Button from "./Button";
import showToast from "../utilities/Toast.js";

const UserRidePanel = ({
  setLocationPanel,
  setUserRidePanel,
  userRidePanel,
  locations,
  setVehiclePanel,
  setFetchingFare,
  fetchingFare,
  setFare,
}) => {
  const findDriver = () => {
    if (
      locations.pickUpLocation.trim().length < 3 ||
      locations.destination.trim().length < 3
    ) {
      setUserRidePanel(false);
      setLocationPanel(true);
    } else {
      setFetchingFare(true);
      fetchFare(locations)
        .then((fareData) => {
          setFare(fareData);
          setFetchingFare(false);
          if (fareData === "No routes found") {
            toast.error("Invalid Locations");
            setUserRidePanel(false);
            setLocationPanel(true);
          } else {
            setUserRidePanel(false);
            setVehiclePanel(true);
          }
        })
        .catch((error) => {
          setFetchingFare(false);
          showToast("Error fetching fare");
        });
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col  px-3 sm:px-4 gap-5 py-4 rounded-t-3xl  bottom-0 absolute bg-black transition-transform duration-200 ease-linear z-[2] ${
        userRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wider">
        Find a Trip
      </h1>

      <div className="flex items-center justify-around w-full flex-col gap-4">
        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => {
            setUserRidePanel(false);
            setLocationPanel(true);
          }}
        >
          <i className="ri-search-line text-lg font-medium text-white px-2"></i>

          <div
            className={`text-gray-300 w-full bg-[#3F4042] pr-4 outline-none font-medium tracking-wide  rounded-lg ${
              locations.pickUpLocation.trim() !== "" && "text-gray-200"
            }`}
          >
            {locations.pickUpLocation.trim()
              ? locations.pickUpLocation
              : "Add Pick-up location"}
          </div>
        </div>

        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => {
            setUserRidePanel(false);
            setLocationPanel(true);
          }}
        >
          <i className="ri-search-line text-lg font-medium text-white px-2"></i>
          <div
            className={`text-gray-300 font-medium tracking-wide w-full bg-[#3F4042] pr-4Flo outline-none rounded-lg ${
              locations.destination.trim() !== "" && "text-gray-200 "
            }`}
          >
            {locations.destination.trim()
              ? locations.destination
              : "Add Destination"}
          </div>
        </div>

        <button
          className="bg-[#C1F11D] flex items-center justify-center w-[96%] rounded-xl py-2 cursor-pointer font-semibold text-lg tracking-wide "
          disabled={fetchingFare}
          onClick={findDriver}
        >
          {fetchingFare ? <div className="loader1"></div> : "Find a Driver"}
        </button>
      </div>
    </div>
  );
};

export default UserRidePanel;
