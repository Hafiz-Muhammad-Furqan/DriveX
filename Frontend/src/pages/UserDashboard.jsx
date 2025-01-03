import { useState } from "react";
import RidePanel from "../components/RidePanel";
import SideBar from "../components/SideBar";
import LocationPanel from "../components/LocationPanel";
import ConfirmRide from "../components/ConfirmRide";
import FindDrivers from "../components/FindDrivers";
import CancelRequest from "../components/CancelRequest";

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
      <RidePanel setOpenLocationPanel={setOpenLocationPanel} />
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
