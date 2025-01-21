import axios from "axios";
import Button from "./Button";

const ConfirmFinishRide = ({
  finishRidePanel,
  ridingData,
  setRidePanel,
  setFinishRidePanel,
}) => {
  const finishRide = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/rides/finish-ride`,
      {
        rideId: ridingData?._id,
        captainId: ridingData?.captain?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    window.location.reload();
  };

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-3 rounded-t-3xl bg-black transition-transform ease-linear duration-200 ${
        finishRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <p className="text-white">
            {ridingData?.user?.fullname?.firstname +
              " " +
              ridingData?.user?.fullname?.lastname}{" "}
          </p>
        </div>

        <div className="w-full py-2 px-2 rounded-lg flex gap-2 items-center justify-start border-2 border-gray-300">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-zinc-400 text-sm font-semibold">To:</p>
          <p className="text-white text-[14px]">{ridingData?.pickup}</p>
        </div>
        <div className="w-full  py-2 gap-2 px-2 rounded-lg border-2 border-gray-300 flex items-center justify-start">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-zinc-400 text-sm font-semibold ">From:</p>
          <p className="text-white text-[14px] ">{ridingData?.destination}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            {ridingData?.fare}
          </p>
        </div>
        <Button
          label={"Finish Ride Go to Home"}
          colors={"bg-[#C1F11D]"}
          onclick={finishRide}
        />
        <Button
          label={"Close"}
          colors={"text-white bg-zinc-600"}
          onclick={() => {
            setRidePanel(true);
            setFinishRidePanel(false);
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmFinishRide;
