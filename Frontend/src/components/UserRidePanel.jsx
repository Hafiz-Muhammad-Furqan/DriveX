import { toast } from "react-toastify";
import fetchFare from "../Utilities/getFare";
import Button from "./Button";

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
          toast.error("Error fetching fare");
        });
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col  px-4 gap-5 py-4 rounded-t-3xl  fixed bg-black transition-transform duration-200 ease-linear z-[10] ${
        userRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-bold tracking-wider">
        Find a Trip
      </h1>

      <div className="flex items-center justify-around w-full flex-col gap-3">
        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => {
            setUserRidePanel(false);
            setLocationPanel(true);
          }}
        >
          <i className="ri-search-line text-lg font-thin text-white px-2"></i>

          <div
            className={`text-gray-300 w-full bg-[#3F4042] pr-4 outline-none  rounded-lg ${
              locations.pickUpLocation.trim() !== "" && "text-white text-lg"
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
          <i className="ri-search-line text-lg font-thin text-white px-2"></i>
          <div
            className={`text-gray-300 w-full bg-[#3F4042] pr-4Flo outline-none rounded-lg ${
              locations.destination.trim() !== "" && "text-white text-lg"
            }`}
          >
            {locations.destination.trim()
              ? locations.destination
              : "Add Destination"}
          </div>
        </div>

        <button
          className="bg-[#C1F11D] flex items-center justify-center w-[96%] rounded-xl py-2 cursor-pointer font-semibold text-lg "
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
