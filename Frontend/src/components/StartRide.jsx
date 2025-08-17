import axios from "axios";
import { useEffect, useState } from "react";
import showToast from "../utilities/Toast";

const StartRide = ({ startRidePanel, startRide }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelCurrentRide = async (rideId) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/cancel/${rideId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setLoading(false);
      showToast("Ride cancelled successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      }
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error]);

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-1 gap-3 py-3 rounded-t-3xl bg-black transition-transform duration-200 ease-linear  ${
        startRidePanel ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <h1 className="text-white text-2xl font-bold tracking-wider">
          Ride Started
        </h1>
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-10 h-10 rounded-full bg-black px-1 py-1 border border-gray-300"
          />
          <p className="text-white">
            {startRide?.user?.fullname?.firstname +
              " " +
              startRide?.user?.fullname?.lastname}
          </p>
        </div>

        <div className="flex gap-3 items-center w-full px-2">
          <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-black"></span>
          </span>
          <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left">
            {startRide?.pickup}
          </p>
        </div>
        <div className="flex gap-3 items-center w-full px-2">
          <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-black"></span>
          </span>
          <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left">
            {startRide?.destination}
          </p>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-2xl"></i>
          <p className="text-white text-lg font-medium text-center">
            PKR {startRide?.fare}
          </p>
        </div>

        <button
          className="text-red-500 bg-zinc-800 flex items-center justify-center w-[96%] rounded-xl py-2 cursor-pointer font-medium text-lg text-center tracking-wide outline-none"
          onClick={() => cancelCurrentRide(startRide._id)}
          disabled={loading}
        >
          Cancel Request{loading ? "..." : ""}
        </button>
      </div>
    </div>
  );
};

export default StartRide;
