import { useState } from "react";
import SideBar from "../Components/SideBar";
import LocationPanel from "../Components/LocationPanel";
import ConfirmRide from "../Components/ConfirmRide";
import FindDrivers from "../Components/FindDrivers";
import CancelRequest from "../Components/CancelRequest";
import UserRidePanel from "../Components/UserRidePanel";

const UserDashboard = () => {
  const [OpenLocationPanel, setOpenLocationPanel] = useState(false);
  return (
    <div className="relative h-[100dvh] w-full flex items-center flex-col ">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          OpenLocationPanel ? "opacity-50" : ""
        }`}
      >
        <img src="/Images/Map.jpeg" alt="map" className="w-full h-full" />
      </div>
      <SideBar />
      <UserRidePanel setOpenLocationPanel={setOpenLocationPanel} />
      {/* <LocationPanel
        OpenLocationPanel={OpenLocationPanel}
        setOpenLocationPanel={setOpenLocationPanel}
      />
      <ConfirmRide></ConfirmRide>
      <FindDrivers></FindDrivers>
      <CancelRequest></CancelRequest> */}
    </div>
  );
};

export default UserDashboard;
