import Button from "../Components/Button";

const FindDrivers = ({
  setFindDriverPanel,
  findDriverPanel,
  setCancelRequestPanel,
  fare,
  locations,
  vehicle,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        findDriverPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wide">
        Sending orders to driver
      </h1>
      <div className="loader"></div>
      <div className="w-full flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute  left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
          <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-8">
            {locations.pickUpLocation}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className=" absolute left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
          <div>
            <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-8">
              {locations.destination}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around w-full flex-col gap-5">
        <div className="flex items-center justify-around w-full gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-start w-full text-xl font-medium ">
            {fare && `PKR ${Math.round(fare[vehicle])}`}
          </p>
        </div>
      </div>
      <Button
        label={"Cancel Request"}
        colors={"bg-gray-600 text-red-500"}
        onclick={() => {
          setCancelRequestPanel(true);
          setFindDriverPanel(false);
        }}
      />
    </div>
  );
};

export default FindDrivers;
