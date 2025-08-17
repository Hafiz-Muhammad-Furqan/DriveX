import axios from "axios";
import Button from "./Button";
import { useEffect, useState } from "react";
import showToast from "../utilities/Toast.js";

const OtpPanel = ({ otpPanel, setOtpPanel, ridingData, setRidePanel }) => {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);
  const handleSubmit = async () => {
    if (ridingData.otp !== otpValue) {
      setError("Invalid OTP");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: ridingData._id,
            otp: otpValue,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setOtpPanel(false);
        setRidePanel(true);
      }
    } catch (error) {
      if (error?.response && error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors[0].msg);
        return;
      }
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      setError(error.message);
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-1  py-3 rounded-t-3xl bg-black transition-transform duration-200 ease-linear  ${
        otpPanel ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-3">
        <h1 className="text-white text-2xl font-semibold tracking-wide">
          Confrim this ride to start
        </h1>
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border border-gray-400"
          />
          <p className="text-white">
            {ridingData?.user?.fullname?.firstname +
              " " +
              ridingData?.user?.fullname?.lastname}
          </p>
        </div>

        <div className="flex gap-3 items-center w-full px-2  pt-2">
          <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-black"></span>
          </span>
          <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left">
            {ridingData?.pickup}
          </p>
        </div>
        <div className="flex gap-3 items-center w-full px-2 pb-2">
          <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-black"></span>
          </span>
          <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left">
            {ridingData?.destination}
          </p>
        </div>
        <div className="w-full flex items-center justify-center gap-3 px-2">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            PKR {ridingData?.fare}
          </p>
        </div>
        <input
          type="text"
          id="pickup"
          className="w-[97%] bg-[#3F4042] outline-none rounded-md text-white placeholder:text-gray-300 py-3 px-3 border "
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

        {/* <Button label={"Cancel"} colors={"text-white bg-red-500"} /> */}
      </div>
    </div>
  );
};

export default OtpPanel;
