import ConfirmFinishRide from "../components/ConfirmFinishRide";
import DriverProfile from "../components/DriverProfile";
import DriverRidePanel from "../components/DriverRidePanel";
import RideRequest from "../components/RideRequest";
import SideBar from "../components/SideBar";

const DriverDashboard = () => {
  return (
    <div className="h-[100dvh] w-full flex items-center flex-col relative">
      <div className="w-full h-full transition-opacity duration-300 ">
        <img src="/Images/Map.jpeg" alt="map" className="w-full h-full" />
      </div>
      <SideBar />
      {/* <RideRequest /> */}
      {/* <DriverProfile /> */}
      {/* <DriverRidePanel /> */}
      <ConfirmFinishRide />
    </div>
  );
};

export default DriverDashboard;
