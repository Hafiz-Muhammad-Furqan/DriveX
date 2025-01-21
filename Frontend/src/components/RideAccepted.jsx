import axios from "axios";
import Button from "./Button";

const RideAccepted = ({ acceptedRidePanel, acceptedRide }) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        acceptedRidePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-bold tracking-wider">
        Ride Accepted
      </h1>
      <div className="w-full flex flex-col items-start justify-between gap-5">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <p className="text-gray-100 text-base font-medium tracking-normal leading-5 ">
            {acceptedRide?.captain?.fullname?.firstname +
              " " +
              acceptedRide?.captain?.fullname?.lastname}
          </p>
        </div>
        <div className="grid grid-cols-3 w-full gap-2">
          <div className="flex flex-col items-center justify-center  px-3 py-3 bg-zinc-900 rounded-lg hover:scale-[1.02] cursor-pointer hover:bg-zinc-800 transition-colors duration-200 ease-linear">
            <h4 className="text-gray-200 text-lg">Plate No</h4>
            <p className="text-gray-100 tracking-wider">
              {acceptedRide?.captain?.vehicle?.plate}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center px-3 py-3 bg-zinc-900 rounded-lg hover:scale-[1.02] cursor-pointer hover:bg-zinc-800 transition-colors duration-200 ease-linear">
            <h4 className="text-gray-200 text-lg">Vehicle</h4>
            <p className="text-gray-100 tracking-wider">
              {acceptedRide?.captain?.vehicle?.vehicleType}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center px-3 py-3 bg-zinc-900 rounded-lg hover:scale-[1.02] cursor-pointer hover:bg-zinc-800 transition-colors duration-200 ease-linear">
            <h4 className="text-gray-200 text-lg">OTP</h4>
            <p className="text-gray-100 tracking-wider">{acceptedRide?.otp}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="relative">
          <div className="absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-[#C1F11D] flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
        </div>
        <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-6">
          {acceptedRide?.pickup}
        </p>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="relative">
          <div className="absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
          </div>
        </div>
        <p className="text-gray-100 text-base font-medium tracking-normal leading-5 pl-6">
          {acceptedRide?.destination}
        </p>
      </div>

      <div className="flex items-center justify-around w-full gap-3">
        <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
        <p className="text-white text-start w-full text-xl font-medium ">
          PKR {acceptedRide?.fare}
        </p>
      </div>
      <Button label={`OTP ${acceptedRide.otp}`} colors={"bg-[#C1F11D]"} />
    </div>
  );
};

export default RideAccepted;
