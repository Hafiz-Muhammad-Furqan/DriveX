import React, { useState } from "react";

const MainApp = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const rideImages = [
    { img: "/Images/RideCar.png", text: "Car" },
    { img: "/Images/RideMoto.png", text: "Bike" },
    { img: "/Images/RideAuto.png", text: "Auto" },
  ];

  return (
    <div className="min-h-[100dvh] w-full flex items-center flex-col">
      <div className="w-full">
        <img src="/Images/Map.jpeg" alt="map" className="w-full h-60" />
      </div>

      <div className="relative w-full flex justify-center items-center py-2">
        <div className="flex items-center justify-around px-2 w-full">
          {rideImages.map((obj, index) => (
            <div
              className={`cursor-pointer rounded-lg transition-all duration-200 px-4 py-2 ${
                selectedRide === index ? "custom rounded-lg" : ""
              }`}
              onClick={() => setSelectedRide(index)}
              key={index}
            >
              <img
                src={obj.img}
                alt={`Ride option ${index}`}
                className="h-10 w-full object-contain bg-center"
              />
              <p className="text-white pt-[2px] text-sm">{obj.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
