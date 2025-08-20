import { useState } from "react";
import Button from "./Button";
import showToast from "../utilities/Toast";
import { useEffect } from "react";
import axios from "axios";

const ConfirmFinishRide = ({
  finishRidePanel,
  setFinishRidePanel,
  setRidePanel,
  ridingData,
  setWaitForPaymentPanel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const finishRideAndPayment = async () => {
    console.log(ridingData);

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/finish-ride`,
        {
          rideId: ridingData?._id,
          captainId: ridingData?.captain?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );

      setFinishRidePanel(false);
      setWaitForPaymentPanel(true);
    } catch (error) {
      console.log(error);
      if (error?.response && error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors[0].msg);
        return;
      }
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      setError("Something went worng, Please try again");
    }
  };

  useEffect(() => {
    if (error) showToast(error);
  }, [error]);

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4  gap-5 py-6 rounded-t-3xl  bg-black transition-transform duration-200 ease-linear z-[10] ${
        finishRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h3 className="text-white text-xl font-semibold text-center tracking-wide">
        Do you want to end the ride?
      </h3>
      <Button
        label={loading ? "Proceed..." : "Finish Ride & Proceed to Payment"}
        colors={"bg-[#C1F11D]"}
        disable={loading}
        onclick={finishRideAndPayment}
      />
      <Button
        label={"Keep Riding"}
        colors={"bg-zinc-800 text-gray-50 tracking-wider"}
        onclick={() => {
          setRidePanel(true);
          setFinishRidePanel(false);
        }}
      />
    </div>
  );
};

export default ConfirmFinishRide;
