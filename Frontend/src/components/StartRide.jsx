import axios from "axios";
import Button from "./Button";

const StartRide = ({ ride, startRidePanel, startRide }) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col fixed bottom-0 px-1 gap-3 py-3 rounded-t-3xl bg-black transition-transform duration-200 ease-linear  ${
        startRidePanel ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <h1 className="text-white text-2xl font-medium">Ride start</h1>
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <p className="text-white">
            {startRide?.user?.fullname?.firstname +
              " " +
              startRide?.user?.fullname?.lastname}
          </p>
        </div>

        <div className="w-full py-2 px-2 rounded-lg flex gap-2 items-center justify-start border-2 border-gray-300">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-white text-[14px]">{startRide?.pickup}</p>
        </div>
        <div className="w-full  py-2 gap-2 px-2 rounded-lg border-2 border-gray-300 flex items-start justify-start">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-white text-[14px] ">{startRide?.destination}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            PKR {startRide?.fare}
          </p>
        </div>

        <Button label={"Make a payment"} colors={"bg-[#C1F11D]"} />
      </div>
    </div>
  );
};

export default StartRide;
