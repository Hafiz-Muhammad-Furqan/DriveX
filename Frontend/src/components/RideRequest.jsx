import { useRideContext } from "../context/RideContext";
import Button from "./Button";

const RideRequest = () => {
  const { rides } = useRideContext();
  console.log(rides);

  const rideAccept = async () => {
    setRideRequestPanel(false);
    setOtpPanel(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/rides/accept`,
      {
        rideId: newRide._id,
        captainId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
        },
      }
    );
  };
  return (
    <div className=" w-[500px] z-[1000] flex-1 flex  items-center flex-col gap-2 py-3 px-2">
      {!rides || rides.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
          No Rides Available
        </div>
      ) : (
        rides.map((ride, index) => (
          <div
            className="w-full flex flex-col items-start justify-center gap-4 py-5 bg-slate-800 rounded-xl px-3"
            key={index}
          >
            <div className="w-full flex items-center justify-start gap-6">
              <img
                src="/Images/avatar.png"
                alt="avatar"
                className="size-9 rounded-full bg-black px-1 py-1"
              />
              <p className="text-white text-lg font-semibold">
                {ride?.user?.fullname?.firstname +
                  " " +
                  ride?.user?.fullname?.lastname}
              </p>
            </div>
            <div className="w-full flex items-center justify-start flex-col gap-2">
              <div className="w-full rounded-lg flex gap-2 items-center justify-start">
                <i className="ri-map-pin-line text-xl text-gray-400"></i>
                <p className="text-gray-300 font-semibold">To:</p>
                <p className="text-white text-lg pl-1">{ride?.pickup}</p>
              </div>
              <div className="w-full gap-2 rounded-lg flex items-center justify-start">
                <i className="ri-map-pin-line text-xl text-gray-400"></i>
                <p className="text-gray-300 font-semibold">From:</p>
                <p className="text-white text-lg pl-1">{ride?.destination}</p>
              </div>
              <div className="w-full flex items-center justify-start gap-3 pb-3 pt-2">
                <i className="ri-cash-line text-[#C1F11D] text-xl pl-1"></i>
                <p className="text-white text-lg font-semibold">
                  PKR {ride?.fare}
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <button className="px-8 py-2 bg-red-800 text-white rounded-lg font-semibold text-base hover:bg-red-900 hover:scale-[1.05] transition-all duration-200 ease-in-out">
                  Ignore
                </button>
                <button
                  className="px-8 hover:bg-[#92ac43] hover:scale-[1.05] transition-all duration-200 ease-in-out py-2 bg-[#b4d453] text-white rounded-lg font-semibold text-base"
                  onClick={rideAccept}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RideRequest;
