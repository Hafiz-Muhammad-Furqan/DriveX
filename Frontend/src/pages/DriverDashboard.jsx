import { useEffect, useState } from "react";
import ConfirmFinishRide from "../components/ConfirmFinishRide";
import DriverProfile from "../components/DriverProfile";
import DriverRidePanel from "../components/DriverRidePanel";
import SideBar from "../components/SideBar";
import OtpPanel from "../components/OtpPanel";
import { updateLocation } from "../utilities/socket.js";
import { useAuth } from "../context/AuthContext";
import { useRideContext } from "../context/RideContext";
import LiveMapTracking from "../components/LiveMapTracking.jsx";
import WaitForPayment from "../components/WaitForPayment.jsx";

const DriverDashboard = () => {
  const { user } = useAuth();
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  const [WaitForPaymentPanel, setWaitForPaymentPanel] = useState(false);
  const { ridingData, isSocketRegistered, setOtpPanel, otpPanel } =
    useRideContext();

  useEffect(() => {
    if (!user?._id || !isSocketRegistered) return;

    const locationInterval = setInterval(() => {
      updateLocation(user._id);
    }, 10000);

    updateLocation(user._id);

    return () => {
      clearInterval(locationInterval);
    };
  }, [user._id, isSocketRegistered]);

  return (
    <div className="relative flex-1 w-full flex items-center flex-col overflow-hidden ">
      <div className="w-full h-full transition-opacity duration-300 ">
        <LiveMapTracking />
      </div>
      <SideBar />

      <DriverProfile user={user} />
      <DriverRidePanel
        ridePanel={ridePanel}
        setFinishRidePanel={setFinishRidePanel}
        setRidePanel={setRidePanel}
        ridingData={ridingData}
      />
      <ConfirmFinishRide
        finishRidePanel={finishRidePanel}
        setFinishRidePanel={setFinishRidePanel}
        setRidePanel={setRidePanel}
        ridingData={ridingData}
        setWaitForPaymentPanel={setWaitForPaymentPanel}
      />
      <OtpPanel
        setOtpPanel={setOtpPanel}
        otpPanel={otpPanel}
        ridingData={ridingData}
        setRidePanel={setRidePanel}
      />
      <WaitForPayment
        WaitForPaymentPanel={WaitForPaymentPanel}
        ridingData={ridingData}
      />
    </div>
  );
};

export default DriverDashboard;
