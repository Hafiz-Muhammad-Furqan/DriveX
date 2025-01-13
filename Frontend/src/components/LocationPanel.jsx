import axios from "axios";
import { useRef, useState } from "react";
import fetchFare from "../Utilities/getFare";
import { toast } from "react-toastify";

const LocationPanel = ({
  locationPanel,
  setLocationPanel,
  locations,
  setLocations,
  setUserRidePanel,
  setVehiclePanel,
  setFare,
  fetchingFare,
  setFetchingFare,
}) => {
  const [locationSuggestions, setLocationSuggestions] = useState(null);
  const [fetchSuggestions, setFetchSuggestions] = useState(false);
  const [activeElement, setActiveElement] = useState(null);

  const useDebounce = (callBack, delay) => {
    let timeoutRef = useRef(null);

    return (value) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callBack(value);
      }, delay);
    };
  };

  const getLocationsFromApi = async (value) => {
    try {
      setFetchSuggestions(true);
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
    } catch (error) {
      console.error("Error fetching locations", error);
      toast.error("Failed to fetch location suggestions.");
    } finally {
      setFetchSuggestions(false);
    }
  };

  const debouncedFetch = useDebounce(getLocationsFromApi, 600);

  const handleLocations = (value, element) => {
    setActiveElement(element);
    setLocations({ ...locations, [element]: value });
    if (value.trim().length < 3) {
      setLocationSuggestions(null);
      return;
    }
    debouncedFetch(value);
  };

  const handleSuggestions = (suggestion) => {
    setLocations((prev) => {
      const updatedLocations = {
        ...prev,
        [activeElement]: suggestion.description,
      };
      if (
        updatedLocations.pickUpLocation.trim().length >= 3 &&
        updatedLocations.destination.trim().length >= 3
      ) {
        setFetchingFare(true);
        fetchFare(updatedLocations)
          .then((fareData) => {
            setFare(fareData);
            setFetchingFare(false);
            if (fareData === "No routes found") {
              toast.error("Invalid Locations");
            } else {
              setVehiclePanel(true);
              setLocationPanel(false);
            }
          })
          .catch((error) => {
            setFetchingFare(false);
            toast.error("Error fetching fare.");
          });
      }
      return updatedLocations;
    });
  };

  return (
    <div
      className={`w-full rounded-t-3xl h-[99dvh] flex items-center flex-col transition-transform duration-200 ease-linear z-[10] ${
        locationPanel ? "translate-y-0" : "translate-y-full"
      } bg-[#141414] fixed bottom-0`}
    >
      {fetchingFare ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="loader3"></div>
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-center px-3 py-7 relative">
            <h2 className="text-center text-white text-xl font-bold">
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
              <div className="relative">
                <div className="absolute top-50 -translate-y-1/2 left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-black"></div>
                </div>
              </div>
              <input
                type="text"
                id="pickup"
                className="w-full bg-[#3F4042] outline-none rounded-lg text-white pl-8 pr-5 placeholder:text-gray-300"
                placeholder="Add Pick-up location"
                value={locations.pickUpLocation}
                onChange={(e) =>
                  handleLocations(e.target.value, "pickUpLocation")
                }
                autoComplete="off"
              />
            </div>
            <div className="w-full flex items-center bg-[#3F4042] rounded-md px-3 py-3">
              <i className="ri-search-line text-lg font-thin text-white"></i>
              <input
                type="text"
                id="destination"
                className="w-full bg-[#3F4042] px-4 outline-none rounded-lg placeholder:text-gray-300 text-white"
                placeholder="Add Destination"
                value={locations.destination}
                onChange={(e) => handleLocations(e.target.value, "destination")}
                autoComplete="off"
              />
            </div>
          </div>
          {fetchSuggestions && (
            <div className="space-y-4 w-full px-3 mt-8">
              <div className="h-4 bg-[#6a6b6d] rounded-md animate-pulse"></div>
              <div className="h-4 bg-[#6a6b6d] rounded-md animate-pulse"></div>
              <div className="h-4 bg-[#6a6b6d] rounded-md animate-pulse"></div>
            </div>
          )}
          {locationSuggestions?.length === 0 && (
            <p className="text-gray-200 text-lg mt-8">No Results found</p>
          )}
          {locationSuggestions?.length > 0 && !fetchSuggestions && (
            <div className="w-full px-3 flex flex-col items-center justify-around text-white mt-8 mb-6 gap-6 overflow-y-scroll no-scrollbar">
              {locationSuggestions?.map((suggestion, index) => (
                <div
                  className="w-full flex items-center justify-center cursor-pointer"
                  key={index}
                  onClick={() => handleSuggestions(suggestion)}
                >
                  <i className="ri-map-pin-line text-2xl text-gray-400"></i>
                  <div className="w-full flex items-start justify-center flex-col px-3 gap-1">
                    <p className="text-white leading-[1.3rem]">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationPanel;
