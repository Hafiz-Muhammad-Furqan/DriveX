import axios from "axios";
import Button from "./Button";

const ConfirmRide = ({
  confirmRidePanel,
  setConfirmRidePanel,
  setFindDriverPanel,
  fare,
  locations,
  vehicle,
}) => {
  const findDrivers = async () => {
    setConfirmRidePanel(false);
    setFindDriverPanel(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/rides/create`,
      {
        pickup: locations.pickUpLocation,
        destination: locations.destination,
        vehicleType: vehicle,
        fare: fare[vehicle],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    console.log(response.data);
  };

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        confirmRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white  text-2xl font-bold tracking-wider">
        Confirm Ride
      </h1>
      <div className="w-full flex items-center gap-2">
        <div className="relative">
          <div className="absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
        </div>
        <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-6">
          {locations.pickUpLocation}
        </p>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="relative">
          <div className=" absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
        </div>
        <div>
          <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-6">
            {locations.destination}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around w-full gap-3">
        <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
        <p className="text-white text-start w-full text-xl font-medium ">
          {fare && `PKR ${Math.round(fare[vehicle])}`}
        </p>
      </div>
      <Button
        label={"Find a Driver"}
        colors={"bg-[#C1F11D]"}
        onclick={findDrivers}
      />
    </div>
  );
};

export default ConfirmRide;
