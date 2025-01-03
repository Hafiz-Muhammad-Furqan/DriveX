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
    <div className="w-full h-[100dvh] relative">
      <SideBar />
      <RidePanel
        OpenLocationPanel={OpenLocationPanel}
        setOpenLocationPanel={setOpenLocationPanel}
      />
      <LocationPanel
        OpenLocationPanel={OpenLocationPanel}
        setOpenLocationPanel={setOpenLocationPanel}
      />
      {/* <ConfirmRide></ConfirmRide> */}
      {/* <FindDrivers></FindDrivers> */}
      <CancelRequest></CancelRequest>
    </div>
  );
};

export default UserDashboard;
