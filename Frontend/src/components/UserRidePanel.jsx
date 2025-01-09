import { useEffect } from "react";
import Button from "./Button";

const UserRidePanel = ({ setOpenLocationPanel, setVehicle, vehicle }) => {
  const rideImages = [
    { img: "/Images/RideMoto.png", text: "Bike" },
    { img: "/Images/RideCar.png", text: "Car" },
    { img: "/Images/RideAuto.png", text: "Auto" },
  ];
  useEffect(() => {
    if (vehicle) {
      console.log(vehicle);
    }
  }, [setVehicle, vehicle]);

  return (
    <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-3 rounded-t-3xl  bg-black transition-opacity duration-300 ">
      <div className="flex items-center justify-center w-full gap-4">
        {rideImages.map((obj, index) => (
          <div
            className={`cursor-pointer rounded-lg transition-all duration-200 px-4 py-1 ${
              vehicle === obj.text ? "bg-[#0c4769] rounded-lg" : ""
            }`}
            onClick={() => setVehicle(obj.text)}
            key={index}
          >
            <img
              src={obj.img}
              alt={`Ride option ${index}`}
              className="h-8 object-contain bg-center"
            />
            <p className="text-white pt-[2px] text-xs font-semibold">
              {obj.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around w-full flex-col gap-3">
        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => setOpenLocationPanel(true)}
        >
          <i className="ri-search-line text-lg font-thin text-white px-2"></i>
          <div className="text-gray-300 w-full bg-[#3F4042] pr-4 outline-none  rounded-lg ">
            Add Pick-up location
          </div>
        </div>

        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => setOpenLocationPanel(true)}
        >
          <i className="ri-search-line text-lg font-thin text-white px-2"></i>
          <div className="text-gray-300 w-full bg-[#3F4042] pr-4Flo outline-none rounded-lg ">
            Add Destination
          </div>
        </div>

        <Button label={"Find a Driver"} colors={"bg-[#C1F11D]"} />
      </div>
    </div>
  );
};

export default UserRidePanel;
