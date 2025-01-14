import { useEffect } from "react";
import ConfirmFinishRide from "../Components/ConfirmFinishRide";
import DriverProfile from "../Components/DriverProfile";
import DriverRidePanel from "../Components/DriverRidePanel";
import RideRequest from "../Components/RideRequest";
import SideBar from "../Components/SideBar";
import { sendMessage } from "../Utilities/socket";
import { useSelector } from "react-redux";

const DriverDashboard = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: user._id });
  }, []);

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
      {/* <RideRequest /> */}
      <DriverProfile user={user} />
      {/* <DriverRidePanel /> */}
      {/* <ConfirmFinishRide /> */}
    </div>
  );
};

export default DriverDashboard;
