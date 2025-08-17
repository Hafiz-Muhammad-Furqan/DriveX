import Button from "./Button";

const ConfirmRide = ({
  confirmRidePanel,
  setConfirmRidePanel,
  setFindDriverPanel,
  fare,
  locations,
  vehicle,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        confirmRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wider">
        Confirm Ride
      </h1>

      <div className="flex gap-3 items-center w-full ">
        <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-black"></span>
        </span>
        <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left ">
          {locations?.pickUpLocation}
        </p>
      </div>
      <div className="flex gap-3 items-center w-full">
        <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-black"></span>
        </span>
        <p className="text-gray-100 text-medium font-medium tracking-wide w-full text-left">
          {locations?.destination}
        </p>
      </div>
      <div className="flex items-center justify-around w-full gap-3">
        <i className="ri-cash-line text-[#C1F11D] text-2xl"></i>
        <p className="text-white text-start w-full text-lg font-medium ">
          {fare && `PKR ${Math.round(fare[vehicle])}`}
        </p>
      </div>
      <Button
        label={"Find a Driver"}
        colors={"bg-[#C1F11D]"}
        onclick={() => {
          setConfirmRidePanel(false);
          setFindDriverPanel(true);
        }}
      />
    </div>
  );
};

export default ConfirmRide;
