import { useState } from "react";
import SideBar from "../Components/SideBar";
import LocationPanel from "../Components/LocationPanel";
import ConfirmRide from "../Components/ConfirmRide";
import FindDrivers from "../Components/FindDrivers";
import CancelRequest from "../Components/CancelRequest";
import UserRidePanel from "../Components/UserRidePanel";
import ChooseVehicle from "../Components/ChooseVehicle";

const UserDashboard = () => {
  const [locationPanel, setLocationPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [userRidePanel, setUserRidePanel] = useState(true);
  const [findDriverPanel, setFindDriverPanel] = useState(false);
  const [cancelRequestPanel, setCancelRequestPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [fare, setFare] = useState(null);
  const [locations, setLocations] = useState({
    pickUpLocation: "",
    destination: "",
  });
  return (
    <div className="relative h-[100dvh] w-full flex items-center flex-col ">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          locationPanel ? "opacity-50" : ""
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
        setLocationPanel={setLocationPanel}
        setVehicle={setVehicle}
        vehicle={vehicle}
        setUserRidePanel={setUserRidePanel}
        userRidePanel={userRidePanel}
        locations={locations}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
      />
      <LocationPanel
        locationPanel={locationPanel}
        setLocationPanel={setLocationPanel}
        locations={locations}
        setLocations={setLocations}
        setUserRidePanel={setUserRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehiclePanel={setVehiclePanel}
        vehicle={vehicle}
        setFare={setFare}
      />
      <ConfirmRide
        confirmRidePanel={confirmRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setFindDriverPanel={setFindDriverPanel}
      ></ConfirmRide>
      <FindDrivers
        setFindDriverPanel={setFindDriverPanel}
        findDriverPanel={findDriverPanel}
        setCancelRequestPanel={setCancelRequestPanel}
      ></FindDrivers>
      <CancelRequest
        setCancelRequestPanel={setCancelRequestPanel}
        cancelRequestPanel={cancelRequestPanel}
        setFindDriverPanel={setFindDriverPanel}
        setUserRidePanel={setUserRidePanel}
      ></CancelRequest>
      <ChooseVehicle
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicle={setVehicle}
      ></ChooseVehicle>
    </div>
  );
};

export default UserDashboard;
