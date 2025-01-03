import { useState } from "react";
import Button from "./Button";

const DriverRidePanel = ({ setOpenLocationPanel }) => {
  const [selectedRide, setSelectedRide] = useState(null);

  const rideImages = [
    { img: "/Images/RideCar.png", text: "Car" },
    { img: "/Images/RideMoto.png", text: "Bike" },
    { img: "/Images/RideAuto.png", text: "Auto" },
  ];

  return (
    <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-10 rounded-t-3xl  bg-black transition-opacity duration-300 ">
      <Button label={"Finish Ride"} colors={"bg-[#C1F11D]"} />
    </div>
  );
};

export default DriverRidePanel;
