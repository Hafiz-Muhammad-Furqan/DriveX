import { useState } from "react";
import Button from "./Button";

const DriverRidePanel = ({ ridePanel }) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col fixed bottom-0 px-4 gap-3 py-10 rounded-t-3xl  bg-black transition-transform duration-200 ease-linear ${
        ridePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button label={"Finish Ride"} colors={"bg-[#C1F11D]"} />
    </div>
  );
};

export default DriverRidePanel;
