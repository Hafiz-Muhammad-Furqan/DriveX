import axios from "axios";
import Button from "./Button";
import { useState } from "react";

const OtpPanel = ({
  newRide,
  otpPanel,
  setOtpPanel,
  setRidePanel,
  setRidingData,
}) => {
  const [otpValue, setOtpValue] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: newRide._id,
            otp: otpValue,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );
      setRidingData(response.data);

      if (response.status === 200) {
        setOtpPanel(false);
        setRidePanel(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-1 gap-3 py-3 rounded-t-3xl bg-black transition-transform duration-200 ease-linear  ${
        otpPanel ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <h1 className="text-white text-2xl font-medium">
          Confrim this ride to start
        </h1>
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <p className="text-white">
            {newRide?.user?.fullname?.firstname +
              " " +
              newRide?.user?.fullname?.lastname}
          </p>
        </div>

        <div className="w-full py-2 px-2 rounded-lg flex gap-2 items-center justify-start border-2 border-gray-300">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-white text-[14px]">{newRide?.pickup}</p>
        </div>
        <div className="w-full  py-2 gap-2 px-2 rounded-lg border-2 border-gray-300 flex items-start justify-start">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-white text-[14px] ">{newRide?.destination}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            PKR {newRide?.fare}
          </p>
        </div>
        <input
          type="text"
          id="pickup"
          className="w-[97%] bg-[#3F4042] outline-none rounded-md text-white placeholder:text-gray-300 py-3 px-3 border mb-4"
          placeholder="Enter OTP"
          autoComplete="off"
          value={otpValue}
          onChange={(e) => setOtpValue(e.target.value)}
        />
        <Button
          label={"Confirm"}
          colors={"bg-[#C1F11D]"}
          onclick={handleSubmit}
        />

        <Button label={"Cancel"} colors={"text-white bg-red-500"} />
      </div>
    </div>
  );
};

export default OtpPanel;
