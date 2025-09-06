import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessage, socket } from "../utilities/socket.js";
import { Check } from "lucide-react";
import { useAuth } from "./AuthContext.jsx";
import showToast from "../utilities/Toast.js";

const RideContext = createContext({
  rides: [],
  setNewRides: () => {},
  otpPanel: false,
  setOtpPanel: () => {},
  ridingData: null,
  setRidingData: () => {},
  profilePanel: true,
  setProfilePanel: () => {},
  isSuccess: false,
  setIsSuccess: () => {},
  isSocketRegistered: false,
  setIsSocketRegistered: () => {},
});

export const RideProvider = ({ children }) => {
  const [rides, setNewRides] = useState([]);
  const [otpPanel, setOtpPanel] = useState(false);
  const [ridingData, setRidingData] = useState(null);
  const [profilePanel, setProfilePanel] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSocketRegistered, setIsSocketRegistered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const url = useLocation();

  useEffect(() => {
    if (!user?._id) return;

    const handleSocketRegistered = () => {
      setIsSocketRegistered(true);
    };

    if (socket.connected) {
      sendMessage("join", { userType: "captain", userId: user._id });
    } else {
      socket.on("connect", () => {
        sendMessage("join", { userType: "captain", userId: user._id });
      });
    }

    socket.on("join-success", handleSocketRegistered);
    socket.on("new-ride", handleNewRide);
    socket.on("ride-cancelled", handleCancelledRide);
    socket.on("ride-unavailable", handleUnavailableRide);
    socket.on("payment-received", handlePaymentReceived);

    return () => {
      socket.off("join-success", handleSocketRegistered);
      socket.off("new-ride", handleNewRide);
      socket.off("ride-cancelled", handleCancelledRide);
      socket.off("ride-unavailable", handleUnavailableRide);
      socket.off("payment-received", handlePaymentReceived);
    };
  }, [user?._id]);

  const handleNewRide = (data) => {
    setNewRides((prev) => {
      const filtered = prev.filter((ride) => ride._id !== data._id);
      return [data, ...filtered];
    });

    if (url.pathname !== "/driver/rides") {
      navigate("/driver/rides");
    }
    setTimeout(() => {
      setNewRides((prev) => prev.filter((ride) => ride._id !== data._id));
    }, 15000);
  };

  const handlePaymentReceived = () => {
    setIsSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleCancelledRide = (data) => {
    setNewRides((prev) => prev.filter((ride) => ride._id !== data.rideId));
    if (data.isStart) {
      showToast("Passenger cancelled the ride.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleUnavailableRide = (data) => {
    setNewRides((prev) => prev.filter((ride) => ride._id !== data.rideId));
  };

  return (
    <RideContext.Provider
      value={{
        rides,
        setNewRides,
        otpPanel,
        setOtpPanel,
        ridingData,
        setRidingData,
        profilePanel,
        setProfilePanel,
        isSocketRegistered,
        setIsSocketRegistered,
      }}
    >
      {isSuccess ? (
        <div className="h-full w-full relative">
          <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative mx-auto w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle
                    className="text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    cx="60"
                    cy="60"
                    r="54"
                  />
                  <circle
                    className="text-[#c1f11d] animate-draw"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeDasharray="339.292"
                    strokeDashoffset="339.292"
                    style={{
                      animation: "draw 1s ease-out forwards",
                      animationDelay: "0.1s",
                    }}
                  />
                </svg>
                <Check
                  className="absolute inset-0 m-auto w-16 h-16 text-[#c1f11d]"
                  style={{
                    opacity: 0,
                    animation: "fadeIn 0.3s ease-out forwards",
                    animationDelay: "0.8s",
                  }}
                />
              </div>
              <h2
                className="text-2xl font-bold text-white mt-6 tracking-wide"
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.5s ease-out forwards",
                  animationDelay: "1.2s",
                }}
              >
                Payment Received !
              </h2>
            </div>
            <style>
              {`
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-draw {
            animation: draw 1s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-progressBar {
            animation: progressBar 2s ease-out forwards;
          }
        `}
            </style>
          </div>
        </div>
      ) : (
        children
      )}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
