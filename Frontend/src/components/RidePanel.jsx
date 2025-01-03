import { useState } from "react";
import Button from "./Button";

const RidePanel = ({ setOpenLocationPanel }) => {
  const [selectedRide, setSelectedRide] = useState(null);

  const rideImages = [
    { img: "/Images/RideCar.png", text: "Car" },
    { img: "/Images/RideMoto.png", text: "Bike" },
    { img: "/Images/RideAuto.png", text: "Auto" },
  ];

  return (
    <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-3 rounded-t-3xl  bg-black transition-opacity duration-300 ">
      <div className="flex items-center justify-center w-full gap-4">
        {rideImages.map((obj, index) => (
          <div
            className={`cursor-pointer rounded-lg transition-all duration-200 px-4 py-1 ${
              selectedRide === index ? "custom rounded-lg" : ""
            }`}
            onClick={() => setSelectedRide(index)}
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
      <div className="w-full flex items-center gap-2 py-1 ">
        <div className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center">
          <div className="h-2 w-2 rounded-lg bg-black"></div>
        </div>
        <div>
          <p className="text-white text-base font-medium tracking-normal leading-4 ">
            Plot D53 gulahsne iqbal namste chourangi
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around w-full flex-col gap-3">
        <div
          className="w-full flex items-center bg-[#3F4042] rounded-lg py-3 cursor-pointer"
          onClick={() => setOpenLocationPanel(true)}
        >
          <i className="ri-search-line text-lg font-thin text-white px-2"></i>
          <div className="text-gray-400 w-full bg-[#3F4042] pr-3 outline-none font-semibold rounded-lg ">
            To
          </div>
        </div>
        <div className="w-full flex items-center bg-[#3F4042] rounded-lg py-3">
          <p className="text-base font-semibold text-white px-2">PKR</p>
          <input
            type="text"
            className="w-full bg-[#3F4042] pr-3 outline-none font-semibold  rounded-lg text-white"
            placeholder="Offer your fare"
          />
          <i className="ri-pencil-line text-lg font-thin text-white px-2"></i>
        </div>
        <Button label={"Find a Driver"} colors={"bg-[#C1F11D]"} />
      </div>
    </div>
  );
};

export default RidePanel;
