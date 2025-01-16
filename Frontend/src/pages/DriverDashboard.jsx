import { useEffect, useState } from "react";
import ConfirmFinishRide from "../Components/ConfirmFinishRide";
import DriverProfile from "../Components/DriverProfile";
import DriverRidePanel from "../Components/DriverRidePanel";
import RideRequest from "../Components/RideRequest";
import SideBar from "../Components/SideBar";
import OtpPanel from "../Components/OtpPanel";

import { socket, sendMessage, updateLocation } from "../Utilities/socket";
import { useSelector } from "react-redux";

const DriverDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [profilePanel, setProfilePanel] = useState(true);
  const [otpPanel, setOtpPanel] = useState(false);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  const [rideRequestPanel, setRideRequestPanel] = useState(false);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: user._id });

    const locationInterval = setInterval(() => {
      updateLocation(user._id);
    }, 10000);
    updateLocation(user._id);
    return () => clearInterval(locationInterval);
  });

  socket.on("new-ride", (data) => {
    setRide(data);
    setProfilePanel(false);
    setRideRequestPanel(true);
  });

  return (
    <div className="h-[100dvh] w-full flex items-center flex-col relative">
      <div className="w-full h-full transition-opacity duration-300 ">
        <img
          src="/Images/Map.webp"
          alt="map"
          className="w-full h-full object-cover bg-center"
        />
      </div>
      <SideBar />
      <RideRequest
        ride={ride}
        user={user}
        setOtpPanel={setOtpPanel}
        setRideRequestPanel={setRideRequestPanel}
        rideRequestPanel={rideRequestPanel}
      />
      <DriverProfile user={user} profilePanel={profilePanel} />
      <DriverRidePanel ridePanel={ridePanel} />
      <ConfirmFinishRide finishRidePanel={finishRidePanel} />
      <OtpPanel otpPanel={otpPanel} ride={ride} />
    </div>
  );
};

export default DriverDashboard;
