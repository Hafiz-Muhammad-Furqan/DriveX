import axios from "axios";
import { useRef, useState } from "react";
import fetchFare from "../utilities/getFare.js";
import { toast } from "react-toastify";
import showToast from "../utilities/Toast.js";
import { useEffect } from "react";

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
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          console.log(pos.coords.latitude);
          console.log(pos.coords.longitude);
        },
        (err) => {
          console.warn("User location not available:", err.message);
        }
      );
    }
  }, []);

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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setFetchSuggestions(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: value,
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          signal: controller.signal,
        }
      );

      setLocationSuggestions(response.data);
      setFetchSuggestions(false);
    } catch (error) {
      if (axios.isCancel(error) || error.name === "CanceledError") {
        return;
      }
      setFetchSuggestions(false);
      showToast("Failed to fetch location suggestions.");
    }
  };

  const debouncedFetch = useDebounce(getLocationsFromApi, 500);

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
      className={`w-full rounded-t-3xl h-[98%] flex items-center flex-col transition-transform duration-200 ease-linear z-[10] ${
        locationPanel ? "translate-y-0" : "translate-y-full"
      } bg-black absolute bottom-0`}
    >
      {fetchingFare ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="loader3"></div>
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-center px-3 py-6 relative">
            <h2 className="text-white text-2xl font-semibold tracking-wider">
              Enter your route
            </h2>
            <i
              onClick={() => {
                setLocationPanel(false);
                setUserRidePanel(true);
              }}
              className="ri-close-line text-white text-xl font-medium px-1 py-[1px] bg-zinc-600 rounded-full cursor-pointer absolute right-3"
            ></i>
          </div>
          <div className="w-full flex flex-col items-center gap-3 px-3">
            <div className="w-full flex items-center bg-[#3F4042] rounded-md py-3 px-3">
              {/* <div className="relative"> */}
              <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center flex-shrink-0">
                <span className="h-2 w-2 rounded-full bg-black"></span>
              </span>
              {/* </div> */}
              <input
                type="text"
                id="pickup"
                className="w-full bg-[#3F4042] outline-none rounded-lg text-white pl-4 pr-5 placeholder:text-gray-300 font-medium tracking-wide"
                placeholder="Add Pick-up location"
                value={locations.pickUpLocation}
                onChange={(e) =>
                  handleLocations(e.target.value, "pickUpLocation")
                }
                autoComplete="off"
              />
            </div>
            <div className="w-full flex items-center bg-[#3F4042] rounded-md px-3 py-3">
              <i className="ri-search-line text-lg font-medium text-white"></i>
              <input
                type="text"
                id="destination"
                className="w-full bg-[#3F4042] px-4 outline-none rounded-lg placeholder:text-gray-300 text-white font-medium tracking-wide"
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
              <div className="h-4 bg-[#6a6b6d] rounded-md animate-pulse"></div>
            </div>
          )}
          {locationSuggestions?.length === 0 && !fetchSuggestions && (
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
