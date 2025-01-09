import { useState } from "react";
import SideBar from "../Components/SideBar";
import LocationPanel from "../Components/LocationPanel";
import ConfirmRide from "../Components/ConfirmRide";
import FindDrivers from "../Components/FindDrivers";
import CancelRequest from "../Components/CancelRequest";
import UserRidePanel from "../Components/UserRidePanel";
import ChooseVehicle from "../Components/ChooseVehicle";

const UserDashboard = () => {
  const [OpenLocationPanel, setOpenLocationPanel] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [locations, setLocations] = useState({
    pickUpLocation: "",
    destination: "",
  });
  return (
    <div className="relative h-[100dvh] w-full flex items-center flex-col ">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          OpenLocationPanel ? "opacity-50" : ""
        }`}
      >
        <img
          src="/Images/Map.webp"
          alt="map"
          className="w-full h-full object-cover bg-center"
        />
      </div>
      <SideBar />
      <UserRidePanel
        setOpenLocationPanel={setOpenLocationPanel}
        setVehicle={setVehicle}
        vehicle={vehicle}
      />
      <LocationPanel
        OpenLocationPanel={OpenLocationPanel}
        setOpenLocationPanel={setOpenLocationPanel}
        locations={locations}
        setLocations={setLocations}
      />
      {/* <ConfirmRide></ConfirmRide> */}
      {/* <FindDrivers></FindDrivers> */}
      {/* <CancelRequest></CancelRequest> */}
      {/* <ChooseVehicle></ChooseVehicle> */}
    </div>
  );
};

export default UserDashboard;
