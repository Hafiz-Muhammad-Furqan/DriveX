import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../Utilities/socket";

const RideContext = createContext({
  rides: [],
  setNewRides: () => {},
});

export const RideProvider = ({ children }) => {
  const [rides, setNewRides] = useState([]);
  const navigate = useNavigate();
  const url = useLocation();

  useEffect(() => {
    const handleNewRide = (data) => {
      setNewRides((prev) => [...prev, data]);

      setTimeout(() => {
        setNewRides((prevRides) =>
          prevRides.filter((ride) => ride._id !== data._id)
        );
      }, 15000);

      if (url.pathname !== "/driver/rides") {
        navigate("/driver/rides");
      }
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [url.pathname, navigate]);

  return (
    <RideContext.Provider value={{ rides, setNewRides }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
