import { useEffect, useState } from "react";
import ConfirmFinishRide from "../components/ConfirmFinishRide";
import DriverProfile from "../components/DriverProfile";
import DriverRidePanel from "../components/DriverRidePanel";
import RideRequest from "../components/RideRequest";
import SideBar from "../components/SideBar";
import OtpPanel from "../components/OtpPanel";
import { socket, sendMessage, updateLocation } from "../utilities/socket.js";
import { useAuth } from "../context/AuthContext";
import { useRideContext } from "../context/RideContext";
import LiveMapTracking from "../components/LiveMapTracking.jsx";

const DriverDashboard = () => {
  const { user } = useAuth();
  const [profilePanel, setProfilePanel] = useState(true);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  // const [ridingData, setRidingData] = useState(null);
  const { ridingData } = useRideContext();

  const { setOtpPanel, otpPanel } = useRideContext();

  useEffect(() => {
    if (!user?._id) return;
    const locationInterval = setInterval(() => {
      updateLocation(user._id);
    }, 10000);
    updateLocation(user._id);
    return () => {
      clearInterval(locationInterval);
    };
  }, [user._id]);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: user._id });
  }, []);

  return (
    <div className="relative flex-1 w-full flex items-center flex-col overflow-hidden ">
      <div className="w-full h-full transition-opacity duration-300 ">
        {/* <img
          src="/Images/Map.webp"
          alt="map"
          className="w-full h-full object-cover bg-center"
        /> */}
        <LiveMapTracking />
      </div>
      <SideBar />

      <DriverProfile user={user} profilePanel={profilePanel} />
      <DriverRidePanel
        ridePanel={ridePanel}
        setFinishRidePanel={setFinishRidePanel}
        setRidePanel={setRidePanel}
      />
      <ConfirmFinishRide
        finishRidePanel={finishRidePanel}
        ridingData={ridingData}
        setRidePanel={setRidePanel}
        setFinishRidePanel={setFinishRidePanel}
      />
      <OtpPanel
        setOtpPanel={setOtpPanel}
        otpPanel={otpPanel}
        ridingData={ridingData}
        setRidePanel={setRidePanel}
      />
    </div>
  );
};

export default DriverDashboard;
