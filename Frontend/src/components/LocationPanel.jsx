import axios from "axios";
import { useState } from "react";

const LocationPanel = ({
  locationPanel,
  setLocationPanel,
  locations,
  setLocations,
  setUserRidePanel,
  setConfirmRidePanel,
  setVehiclePanel,
  vehicle,
}) => {
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const getLocationsFromApi = async (value) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    setLocationSuggestions(response.data);
    console.log(response.data);
    return response.data;
  };

  const handlePickUpLocation = async (e) => {
    if (e.target.value.trim().length < 3) {
      return;
    }
    try {
      const pickUpLocations = await getLocationsFromApi(e.target.value.trim());
      setLocations({ ...locations, pickUpLocation: pickUpLocations });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDestination = async (e) => {
    if (e.target.value.trim().length < 3) {
      return;
    }
    try {
      const destination = await getLocationsFromApi(e.target.value.trim());
      setLocations({ ...locations, destination: destination });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`w-full rounded-t-3xl h-[99dvh] flex items-center flex-col transition-transform duration-200 ease-linear z-[10] ${
        locationPanel ? "translate-y-0" : "translate-y-full"
      } bg-[#141414] fixed bottom-0`}
    >
      <div className="w-full flex items-center justify-center px-3 py-7  relative">
        <h2 className="text-center text-white text-xl font-bold ">
          Enter your route
        </h2>
        <i
          onClick={() => {
            setLocationPanel(false);
            setUserRidePanel(true);
          }}
          className="ri-close-line text-white text-xl font-bold px-1 py-[1px] bg-zinc-600 rounded-full cursor-pointer absolute right-3"
        ></i>
      </div>
      <div className="w-full flex flex-col items-center gap-3 px-3">
        <div className="w-full flex items-center bg-[#3F4042] rounded-md py-3 px-3">
          <div className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <input
            type="text"
            className="w-full bg-[#3F4042] outline-none rounded-lg text-white px-4 placeholder:text-gray-300"
            placeholder="Add Pick-up location"
            value={locations.pickUpLocation}
            onChange={handlePickUpLocation}
          />
        </div>
        <div className="w-full flex items-center bg-[#3F4042] rounded-md px-3  py-3">
          <i className="ri-search-line text-lg font-thin text-white"></i>
          <input
            type="text"
            className="w-full bg-[#3F4042] px-4 outline-none  rounded-lg placeholder:text-gray-300 text-white"
            placeholder="Destination"
            value={locations.destination}
            onChange={handleDestination}
          />
        </div>
      </div>
      <div className="w-full px-3 flex flex-col items-center justify-around text-white mt-8 mb-6 gap-6 overflow-y-scroll no-scrollbar">
        {locationSuggestions.map((suggestion, index) => (
          <div
            className="w-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (vehicle) {
                setConfirmRidePanel(true);
                setLocationPanel(false);
              } else {
                setVehiclePanel(true);
                setLocationPanel(false);
              }
            }}
          >
            <i className="ri-map-pin-line text-2xl text-gray-400"></i>
            <div className="w-full flex items-start justify-center flex-col px-3 gap-1">
              {/* <p className="font-semibold leading-5">
                Lorem ipsum dolor sit amet .
              </p> */}
              <p className="text-xs font-thin text-gray-400">{suggestion}</p>
            </div>
            <p className="text-gray-400 text-xs">2.3k/m</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationPanel;
