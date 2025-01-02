import { useState } from "react";
import Btn1 from "../components/Btn1";

const ConfirmRide = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const rideImages = [
    { img: "/Images/RideCar.png", text: "Car" },
    { img: "/Images/RideMoto.png", text: "Bike" },
    { img: "/Images/RideAuto.png", text: "Auto" },
  ];

  return (
    <div className="h-[100dvh] w-full flex items-center flex-col relative">
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
              <p className="text-white pt-[2px] text-xs">{obj.text}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-2 py-2 ">
          <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
            <div className="h-2 w-2 rounded-lg bg-black"></div>
          </div>
          <div>
            <p className="text-white text-base font-medium tracking-normal leading-4 ">
              Plot D53 gulahs iqbal namste chourangi
            </p>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 py-2 ">
          <div className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center">
            <div className="h-2 w-2 rounded-lg bg-black"></div>
          </div>
          <div>
            <p className="text-white text-base font-medium tracking-normal leading-4 ">
              Plot D53 gulahs iqbal namste chourangi
            </p>
          </div>
        </div>
        <div className="flex items-center justify-around w-full flex-col gap-5">
          <p className="text-white text-start w-full text-xl font-semibold pl-6">
            PKR 1 ,000
          </p>
          <Btn1 label={"Find a Driver"} style={"py-2"} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
