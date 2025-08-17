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
    if (!user?._id) return;

    const registerUser = () => {
      sendMessage("join", { userType: "user", userId: user._id });
      console.log(user._id);
    };

    if (socket.connected) {
      registerUser();
    } else {
      socket.on("connect", registerUser);
    }

    return () => {
      socket.off("connect", registerUser);
    };
  }, [user?._id]);

  useEffect(() => {
    const handleRideAccepted = (data) => {
      console.log("Ride accepted:", data);
      setAcceptedRide(data);
      setFindDriverPanel(false);
      setAcceptedRidePanel(true);
    };

    const handleRideStarted = (data) => {
      console.log("Ride started:", data);
      setAcceptedRidePanel(false);
      setStartRidePanel(true);
      setStartRide(data);
    };

    const handleRideFinished = (data) => {
      console.log("Ride finished:", data);
      showToast("Ride finished successfully", "success");
      setRideCompletePanel(true);
      setStartRidePanel(false);
    };

    socket.on("ride-accepted", handleRideAccepted);
    socket.on("ride-started", handleRideStarted);
    socket.on("ride-finished", handleRideFinished);

    return () => {
      socket.off("ride-accepted", handleRideAccepted);
      socket.off("ride-started", handleRideStarted);
      socket.off("ride-finished", handleRideFinished);
    };
  }, []);

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
      />
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
      />
      <CancelRequest
        setCancelRequestPanel={setCancelRequestPanel}
        cancelRequestPanel={cancelRequestPanel}
        setFindDriverPanel={setFindDriverPanel}
        createdRide={createdRide}
      />
      <ChooseVehicle
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicle={setVehicle}
        fare={fare}
        locations={locations}
      />
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
