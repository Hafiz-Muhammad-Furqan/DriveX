import Button from "./Button";

const DriverProfile = ({ user }) => {
  const { fullname } = user;
  const { firstname, lastname } = fullname;
  return (
    <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-2 gap-3 py-3 pb-6 rounded-t-3xl bg-black transition-opacity duration-300 ">
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <p className="text-white capitalize">{firstname + " " + lastname}</p>
        </div>
        <div className="w-full flex items-center justify-start gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-base font-medium text-center">
            Total Earned
          </p>
          <p className="text-white text-lg font-semibold text-center">
            PKR 300
          </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
          <div className="w-full flex flex-col items-center justify-around bg-zinc-800 rounded-lg px-1 py-1 gap-2">
            <i className="ri-speed-up-fill text-2xl text-white"></i>
            <p className="text-white tracking-tight text-center leading-5">
              Hours Online
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-around bg-zinc-800 rounded-lg px-1 py-1 gap-2">
            <i className="ri-speed-up-fill text-2xl text-white"></i>
            <p className="text-white tracking-tight text-center leading-5">
              Hours Online
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-around bg-zinc-800 rounded-lg px-1 py-1 gap-2">
            <i className="ri-speed-up-fill text-2xl text-white"></i>
            <p className="text-white tracking-tight text-center leading-5">
              Hours Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
