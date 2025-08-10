import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../utilities/socket.js";
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
});

export const RideProvider = ({ children }) => {
  const [rides, setNewRides] = useState([]);
  const [otpPanel, setOtpPanel] = useState(false);
  const [ridingData, setRidingData] = useState(null);
  const [profilePanel, setProfilePanel] = useState(true);
  const navigate = useNavigate();
  const url = useLocation();

  const handleNewRide = (data) => {
    console.log("new ride");
    console.log(data);

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
    showToast("Payment Recieved Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCancelledRide = (data) => {
    console.log(data);

    setNewRides((prev) => prev.filter((ride) => ride._id !== data.rideId));
  };

  useEffect(() => {
    console.log("-----------------hello");
    socket.on("new-ride", handleNewRide);
    socket.on("ride-cancelled", handleCancelledRide);
    socket.on("payment-received", handlePaymentReceived);

    return () => {
      socket.off("ride-cancelled", handleCancelledRide);
      socket.off("new-ride", handleNewRide);
    };
  }, []);

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
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
