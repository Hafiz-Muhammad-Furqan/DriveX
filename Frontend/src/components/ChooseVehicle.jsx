import React from "react";
import axios from "axios";

const ChooseVehicle = ({
  setVehiclePanel,
  vehiclePanel,
  setConfirmRidePanel,
  setVehicle,
  fare,
}) => {
  const vehicle = [
    { img: "/Images/RideCar.png", text: "Car", fare: fare?.Car },
    { img: "/Images/RideAuto.png", text: "Auto", fare: fare?.Auto },
    { img: "/Images/RideMoto.png", text: "Bike", fare: fare?.Bike },
  ];

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-0 gap-4 py-4 rounded-t-2xl bg-black transition-transform duration-200 ease-linear z-[10] ${
        vehiclePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white  text-2xl font-semibold tracking-wider">
        Choose Vehicle
      </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 ">
        {vehicle.map((vehicle, index) => (
          <React.Fragment key={index}>
            <div
              className="w-full py-3 px-2 rounded-lg flex gap-4 items-center justify-center border-2 border-zinc-500 cursor-pointer hover:bg-gray-900 hover:scale-[1.01] transition-all duration-200 ease-linear"
              onClick={() => {
                setVehicle(vehicle.text);
                setVehiclePanel(false);
                setConfirmRidePanel(true);
              }}
            >
              <img src={vehicle.img} alt={vehicle.text} className="h-9" />
              <div className="w-full flex-col  flex items-start justify-around  gap-[1px]">
                <p className="text-white text-lg font-semibold tracking-wider">
                  {vehicle.text}
                </p>
                <p className="text-gray-200 text-[14px] tracking-wider">
                  Affordable {vehicle.text} Ride.
                </p>
              </div>
              <div className="flex items-center justify-center">
                {fare ? (
                  <div className="text-white whitespace-nowrap font-medium flex flex-col items-center justify-center pr-1 leading-65">
                    <span className="text-gray-200 tracking-wider">PKR</span>
                    <p>{Math.round(vehicle.fare)}</p>
                  </div>
                ) : (
                  <div className="loader3"></div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChooseVehicle;
