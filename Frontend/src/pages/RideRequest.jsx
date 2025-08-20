import { Link, useNavigate } from "react-router-dom";
import { useRideContext } from "../context/RideContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import showToast from "../utilities/Toast.js";
import axios from "axios";
import { MoveLeft } from "lucide-react";

const RideRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setNewRides, setOtpPanel, setRidingData, setProfilePanel, rides } =
    useRideContext();
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
      setRidingData(response.data);
      console.log(response.data);

      navigate("/driver/dashboard");
      setProfilePanel(false);
      setOtpPanel(true);
    } catch (error) {
      setLoading(false);
      const validationError =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        error.message;
      setError(validationError);
    }
  };

  return (
    <div className="w-full  h-full  px-3 py-5 overflow-y-auto no-scrollbar bg-slate-950 rounded-lg">
      {!rides || rides.length === 0 ? (
        <div className="flex items-center justify-center h-full flex-col">
          <p className="text-gray-200 text-xl font-semibold py-4 tracking-wider">
            No Rides Available
          </p>
          <Link
            to="/driver/dashboard"
            className={`bg-[#C1F11D] flex items-center  rounded-xl px-5 py-2 cursor-pointer justify-between gap-2`}
          >
            <MoveLeft strokeWidth={3} size={20} />
            <p className="font-semibold  text-center w-full">Go Back</p>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center relative">
            <MoveLeft
              strokeWidth={3}
              className="text-white cursor-pointer text-2xl absolute left-2"
              onClick={() => navigate("/driver/dashboard")}
            />
            <h3 className="text-gray-100 text-xl font-semibold tracking-wider my-1">
              Available Rides
            </h3>
          </div>
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="bg-slate-950 rounded-2xl shadow-xl px-4 py-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl border-gray-700 border-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/Images/avatar.png"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border border-gray-400 "
                />
                <p className="text-white text-lg font-semibold tracking-wider">
                  {ride?.user?.fullname?.firstname}{" "}
                  {ride?.user?.fullname?.lastname}
                </p>
              </div>

              <div className="text-white text-sm flex flex-col gap-3 mt-3">
                <div className="flex gap-2 items-center">
                  <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center  flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-black"></span>
                  </span>
                  <span className="pl-1 tracking-wide">{ride.pickup}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-black"></span>
                  </span>
                  <span className="pl-1 tracking-wide">{ride.destination}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#C0F11C] text-base font-medium">
                <i className="ri-cash-line text-xl"></i>
                <span className="text-white font-medium ">PKR {ride.fare}</span>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  className="w-[48%] py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all"
                  onClick={() => {
                    setNewRides((prev) =>
                      prev.filter((r) => r._id !== ride._id)
                    );
                  }}
                >
                  Ignore
                </button>
                <button
                  className={`w-[48%] py-2 rounded-lg font-semibold text-sm ${
                    loading
                      ? "bg-[#92ac43]/70 text-white cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  } transition-all`}
                  onClick={() => rideAccept(ride._id)}
                  disabled={loading}
                >
                  {loading ? "Accepting..." : "Accept"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideRequest;
