import ConfirmFinishRide from "../Components/ConfirmFinishRide";
import DriverProfile from "../Components/DriverProfile";
import DriverRidePanel from "../Components/DriverRidePanel";
import RideRequest from "../Components/RideRequest";
import SideBar from "../Components/SideBar";

const DriverDashboard = () => {
  return (
    <div className="h-[100dvh] w-full flex items-center flex-col relative">
      <div className="w-full h-full transition-opacity duration-300 ">
        <img src="/Images/Map.webp" alt="map" className="w-full h-full" />
      </div>
      <SideBar />
      {/* <RideRequest /> */}
      {/* <DriverProfile /> */}
      {/* <DriverRidePanel /> */}
      {/* <ConfirmFinishRide /> */}
    </div>
  );
};

export default DriverDashboard;
