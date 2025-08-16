import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import LocationPanel from "../components/LocationPanel";
import ConfirmRide from "../components/ConfirmRide";
import FindDrivers from "../components/FindDrivers";
import CancelRequest from "../components/CancelRequest";
import UserRidePanel from "../components/UserRidePanel";
import ChooseVehicle from "../components/ChooseVehicle";
import { sendMessage, socket } from "../utilities/socket.js";
import RideAccepted from "../components/RideAccepted";
import StartRide from "../components/StartRide";
import { useAuth } from "../context/AuthContext";
import showToast from "../utilities/Toast.js";
import DriversNotFound from "../components/DriversNotFound.jsx";
import LiveMapTracking from "../components/LiveMapTracking.jsx";
import RideComplete from "../components/RideComplete.jsx";

const UserDashboard = () => {
  const { user } = useAuth();

  const [userRidePanel, setUserRidePanel] = useState(true);
  const [locationPanel, setLocationPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [findDriverPanel, setFindDriverPanel] = useState(false);
  const [acceptedRidePanel, setAcceptedRidePanel] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [createdRide, setCreatedRide] = useState(null);
  const [cancelRequestPanel, setCancelRequestPanel] = useState(false);
  const [rideCompletePanel, setRideCompletePanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [fetchingFare, setFetchingFare] = useState(false);
  const [startRide, setStartRide] = useState(false);
  const [startRidePanel, setStartRidePanel] = useState(false);
  const [NoDriversFound, setNoDriversFound] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [fare, setFare] = useState(null);
  const [locations, setLocations] = useState({
    pickUpLocation: "",
    destination: "",
  });

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
  }, []);

  socket.on("ride-accepted", (data) => {
    console.log(data);

    setAcceptedRide(data);
    setFindDriverPanel(false);
    setAcceptedRidePanel(true);
  });

  socket.on("ride-started", (data) => {
    setAcceptedRidePanel(false);
    setStartRidePanel(true);
    setStartRide(data);
  });

  socket.on("ride-finished", (data) => {
    showToast("Ride Finished successfully", "success");
    setRideCompletePanel(true);
    setStartRidePanel(false);
  });

  return (
    <div className="relative flex-1 w-full flex items-center flex-col overflow-hidden">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          locationPanel ? "opacity-50" : ""
        }`}
      >
        <LiveMapTracking />
      </div>
      <SideBar />
      <UserRidePanel
        setLocationPanel={setLocationPanel}
        setUserRidePanel={setUserRidePanel}
        userRidePanel={userRidePanel}
        locations={locations}
        setVehiclePanel={setVehiclePanel}
        fetchingFare={fetchingFare}
        setFetchingFare={setFetchingFare}
        setFare={setFare}
      />
      <LocationPanel
        locationPanel={locationPanel}
        setLocationPanel={setLocationPanel}
        locations={locations}
        setLocations={setLocations}
        setUserRidePanel={setUserRidePanel}
        setVehiclePanel={setVehiclePanel}
        setFare={setFare}
        fetchingFare={fetchingFare}
        setFetchingFare={setFetchingFare}
      />
      <ConfirmRide
        confirmRidePanel={confirmRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setFindDriverPanel={setFindDriverPanel}
        fare={fare}
        vehicle={vehicle}
        locations={locations}
        setCreatedRide={setCreatedRide}
      ></ConfirmRide>
      <FindDrivers
        setFindDriverPanel={setFindDriverPanel}
        findDriverPanel={findDriverPanel}
        setCancelRequestPanel={setCancelRequestPanel}
        fare={fare}
        vehicle={vehicle}
        locations={locations}
        setNoDriversFound={setNoDriversFound}
        setCreatedRide={setCreatedRide}
        createdRide={createdRide}
      ></FindDrivers>
      <CancelRequest
        setCancelRequestPanel={setCancelRequestPanel}
        cancelRequestPanel={cancelRequestPanel}
        setFindDriverPanel={setFindDriverPanel}
        createdRide={createdRide}
      ></CancelRequest>
      <ChooseVehicle
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicle={setVehicle}
        fare={fare}
        locations={locations}
      ></ChooseVehicle>
      <DriversNotFound
        setCancelRequestPanel={setCancelRequestPanel}
        setFindDriverPanel={setFindDriverPanel}
        setNoDriversFound={setNoDriversFound}
        NoDriversFound={NoDriversFound}
      />
      <RideAccepted
        acceptedRidePanel={acceptedRidePanel}
        acceptedRide={acceptedRide}
      />
      <StartRide startRidePanel={startRidePanel} startRide={startRide} />
      <RideComplete
        startRide={startRide}
        rideCompletePanel={rideCompletePanel}
      />
    </div>
  );
};

export default UserDashboard;
