import axios from "axios";
import { socket } from "../Utilities/socket";
import Button from "./Button";
import showToast from "../Utilities/Toast";
import { useState } from "react";

const CancelRequest = ({
  cancelRequestPanel,
  setCancelRequestPanel,
  setFindDriverPanel,
  createdRide,
}) => {
  const [loading, setLoading] = useState(false);
  const cancelCurrentRide = async (rideId) => {
    console.log(createdRide);

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/cancel/${rideId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setLoading(false);
      showToast("Ride cancelled successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.message) {
        showToast(error.response.data.message);
      }
      setLoading(false);
      showToast(error.message);
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-3 rounded-t-3xl  bg-black transition-transform duration-200 ease-linear z-[10] ${
        cancelRequestPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h3 className="text-white text-xl font-extrabold text-center">
        Do you want to cancel the request?
      </h3>
      <Button
        label={"Keep Searching"}
        colors={"bg-[#C1F11D]"}
        onclick={() => {
          setCancelRequestPanel(false);
          setFindDriverPanel(true);
        }}
      />
      <button
        className="text-red-500 bg-gray-600 flex items-center justify-center w-[96%] rounded-xl py-2 cursor-pointer font-medium text-lg text-center "
        onClick={() => cancelCurrentRide(createdRide._id)}
        disabled={loading}
      >
        Cancel Request
      </button>
    </div>
  );
};

export default CancelRequest;
