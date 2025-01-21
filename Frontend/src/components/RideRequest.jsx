import { useNavigate } from "react-router-dom";
import { useRideContext } from "../context/RideContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import showToast from "../Utilities/Toast";
import axios from "axios";

const RideRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { rides, setNewRides, setOtpPanel } = useRideContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);

  const rideAccept = async (rideId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/accept`,
        {
          rideId,
          captainId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );
      setLoading(false);
      navigate("/driver/dashboard", { state: { ride: response.data } });
      setOtpPanel(true);
    } catch (error) {
      setLoading(false);
      if (error?.response && error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors[0].msg);
        return;
      }
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      setError(error.message);
    }
  };
  return (
    <div className=" w-[500px] z-[1000] flex-1 flex  items-center flex-col gap-2 py-3 px-2">
      {!rides || rides.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
          No Rides Available
        </div>
      ) : (
        rides.map((ride, index) => (
          <div
            className="w-full flex flex-col items-start justify-center gap-4 py-5 bg-slate-800 rounded-xl px-3"
            key={index}
          >
            <div className="w-full flex items-center justify-start gap-6">
              <img
                src="/Images/avatar.png"
                alt="avatar"
                className="size-9 rounded-full bg-black px-1 py-1"
              />
              <p className="text-white text-lg font-semibold">
                {ride?.user?.fullname?.firstname +
                  " " +
                  ride?.user?.fullname?.lastname}
              </p>
            </div>
            <div className="w-full flex items-center justify-start flex-col gap-2">
              <div className="w-full rounded-lg flex gap-2 items-center justify-start">
                <div className="relative">
                  <div className=" absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
                    <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
                  </div>
                </div>
                <p className="text-white text-lg pl-1">{ride?.pickup}</p>
              </div>
              <div className="w-full gap-2 rounded-lg flex items-center justify-start">
                <div className="relative">
                  <div className=" absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
                    <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
                  </div>
                </div>
                <p className="text-white text-lg pl-1">{ride?.destination}</p>
              </div>
              <div className="w-full flex items-center justify-start gap-3 pb-3 pt-2">
                <i className="ri-cash-line text-[#C1F11D] text-xl pl-1"></i>
                <p className="text-white text-lg font-semibold">
                  PKR {ride?.fare}
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <button
                  className="px-8 py-2 bg-red-800 text-white rounded-lg font-semibold text-base hover:bg-red-900 hover:scale-[1.05] transition-all duration-200 ease-in-out"
                  onClick={() => {
                    setNewRides(
                      rides.filter((filterRide) => {
                        filterRide !== ride._id;
                      })
                    );
                  }}
                >
                  Ignore
                </button>
                <button
                  className="px-8 hover:bg-[#92ac43] hover:scale-[1.05] transition-all duration-200 ease-in-out py-2 bg-[#b4d453] text-white rounded-lg font-semibold text-base"
                  disabled={loading}
                  onClick={() => rideAccept(ride._id)}
                >
                  {loading ? <div className="loader1"></div> : "Accept"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RideRequest;
