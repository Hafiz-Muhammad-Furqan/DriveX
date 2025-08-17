import Button from "./Button";

const DriverRidePanel = ({
  ridingData,
  ridePanel,
  setRidePanel,
  setFinishRidePanel,
}) => {
  const handleFinish = async () => {
    setRidePanel(false);
    setFinishRidePanel(true);
  };

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-2 gap-3 py-3 rounded-t-3xl bg-black transition-transform ease-linear duration-200 ${
        ridePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wider py-1">
        Ride Started!
      </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border border-gray-400"
          />
          <p className="text-white">
            {ridingData?.user?.fullname?.firstname +
              " " +
              ridingData?.user?.fullname?.lastname}{" "}
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
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            {ridingData?.fare}
          </p>
        </div>
        <Button
          label={"Finish Ride"}
          colors={"bg-[#C1F11D]"}
          onclick={handleFinish}
        />
      </div>
    </div>
  );
};

export default DriverRidePanel;
