import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../utilities/socket.js";

const RideContext = createContext({
  rides: [],
  setNewRides: () => {},
  otpPanel: false,
  setOtpPanel: () => {},
  ridingData: null,
  setRidingData: () => {},
});

export const RideProvider = ({ children }) => {
  const [rides, setNewRides] = useState([]);
  const [otpPanel, setOtpPanel] = useState(false);
  const [ridingData, setRidingData] = useState(null);
  const navigate = useNavigate();
  const url = useLocation();

  // useEffect(() => {
  // console.log("newride cahala");

  const handleNewRide = (data) => {
    console.log("new ride");
    console.log(data);

    setNewRides((prev) => {
      const filtered = prev.filter((ride) => ride._id !== data._id);
      return [data, ...filtered];
    });

    setTimeout(() => {
      setNewRides((prev) => prev.filter((ride) => ride._id !== data._id));
    }, 15000);

    if (url.pathname !== "/driver/rides") {
      navigate("/driver/rides");
    }
  };

  // return () => {
  //   socket.off("new-ride", handleNewRide);
  // };
  // }, [url.pathname, navigate, rides, setNewRides]);

  const handleCancelledRide = (data) => {
    console.log("heloooooo");
    console.log(data);

    setNewRides((prev) => prev.filter((ride) => ride._id !== data.rideId));
  };

  useEffect(() => {
    socket.on("new-ride", handleNewRide);

    socket.on("ride-cancelled", handleCancelledRide);

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
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
