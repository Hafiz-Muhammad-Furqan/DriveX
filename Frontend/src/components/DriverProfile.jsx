import { useRideContext } from "../context/RideContext";
import Button from "./Button";

const DriverProfile = ({ user }) => {
  const { fullname } = user;
  const { firstname, lastname } = fullname;
  const { profilePanel } = useRideContext();

  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-2 gap-3 py-3 pb-4 rounded-t-3xl bg-black transition-transform duration-200 ease-linear ${
        profilePanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-2">
        <div className="w-full flex items-center justify-start gap-4 py-2">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border border-gray-300"
          />
          <p className="text-white capitalize text-xl font-bold tracking-wide">
            {firstname + " " + lastname}
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <div className="w-full flex flex-col items-center justify-around bg-zinc-800 rounded-lg px-1 py-3 gap-1 hover:scale-[1.02] hover:bg-zinc-900 cursor-pointer transition-transform duration-200 linear hover:shadow-sm hover:shadow-zinc-800">
            <h2 className="text-zinc-100 text-lg font-semibold">
              Total Earned
            </h2>
            <p className="text-white tracking-tight text-center leading-5">
              PKR 300
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-around bg-zinc-800 rounded-lg px-1 py-3 gap-1 hover:scale-[1.02] hover:bg-zinc-900 cursor-pointer transition-transform duration-200 linear hover:shadow-sm hover:shadow-zinc-800">
            <h2 className="text-zinc-100 text-lg font-semibold">Total Rides</h2>
            <p className="text-white tracking-tight text-center leading-5">
              Total Rides
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
