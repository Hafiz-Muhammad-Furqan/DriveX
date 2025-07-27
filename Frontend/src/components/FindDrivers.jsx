import { useEffect, useState } from "react";
import Button from "./Button";
import showToast from "../utilities/Toast";
import axios from "axios";

const FindDrivers = ({
  setFindDriverPanel,
  findDriverPanel,
  setCancelRequestPanel,
  fare,
  locations,
  vehicle,
  setCreatedRide,
  setNoDriversFound,
  createdRide,
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (createdRide) {
        console.log(createdRide);
        setNoDriversFound(true);
        setFindDriverPanel(false);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [createdRide]);

  const findDrivers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/create`,
        {
          pickup: locations.pickUpLocation,
          destination: locations.destination,
          vehicleType: vehicle,
          fare: fare[vehicle],
          riderId: createdRide?._id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      console.log(response.data);

      setCreatedRide(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response && error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors[0].msg);
        return;
      }
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      setError("Ride creation failed, please try again");
    }
  };

  useEffect(() => {
    if (findDriverPanel) {
      findDrivers();
    }
  }, [findDriverPanel]);
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        findDriverPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wide">
        Sending orders to driver
      </h1>
      <div className="loader"></div>
      <div className="w-full flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute  left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
          <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-8">
            {locations.pickUpLocation}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className=" absolute left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
          <div>
            <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-8">
              {locations.destination}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around w-full flex-col gap-5">
        <div className="flex items-center justify-around w-full gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-start w-full text-xl font-medium ">
            {fare && `PKR ${Math.round(fare[vehicle])}`}
          </p>
        </div>
      </div>
      <Button
        label={"Cancel Request"}
        colors={"bg-gray-600 text-red-500"}
        onclick={() => {
          setCancelRequestPanel(true);
          setFindDriverPanel(false);
        }}
      />
    </div>
  );
};

export default FindDrivers;
