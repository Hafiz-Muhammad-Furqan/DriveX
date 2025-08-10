import Button from "./Button";

const WaitForPayment = ({ WaitForPaymentPanel, ridingData }) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-3 rounded-t-3xl bg-black transition-transform ease-linear duration-200 ${
        WaitForPaymentPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-2xl font-semibold tracking-wider pt-1">
        Ride Completed !
      </h1>
      <p className="text-gray-400">
        Waiting for passenger to complete payment...
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-4 px-3 py-1">
        <div className="w-full flex items-center justify-start gap-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border border-gray-400"
          />
          <p className="text-white">
            {ridingData?.user?.fullname?.firstname +
              " " +
              ridingData?.user?.fullname?.lastname}{" "}
          </p>
        </div>

        <div className="w-full py-2 px-2 rounded-lg flex gap-2 items-center justify-start border-2 border-gray-300">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-zinc-400 text-sm font-semibold">To:</p>
          <p className="text-white text-sm">{ridingData?.pickup}</p>
        </div>
        <div className="w-full  py-2 gap-2 px-2 rounded-lg border-2 border-gray-300 flex items-center justify-start">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <p className="text-zinc-400 text-sm font-semibold ">From:</p>
          <p className="text-white text-sm">{ridingData?.destination}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-lg font-semibold text-center">
            {ridingData?.fare}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="w-6 h-6 border-2 border-[#C1F11D] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 text-sm mt-2">Processing Payment...</p>
        </div>
      </div>
    </div>
  );
};

export default WaitForPayment;
