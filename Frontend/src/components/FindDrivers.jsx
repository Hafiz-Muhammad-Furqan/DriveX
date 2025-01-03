import Btn2 from "../components/Btn2";

const FindDrivers = () => {
  return (
    <div className=" w-full flex items-center flex-col relative">
      <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-3 py-3 rounded-t-3xl  bg-black transition-opacity duration-300 ">
        <h1 className="text-white text-xl font-semibold">
          Offering your price...
        </h1>
        <div className="loader"></div>
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
          <p className="text-white text-start w-full text-xl  font-semibold pl-6">
            PKR 1 ,000
          </p>
          <Btn2
            label={"Cancel Request"}
            style={"py-2 text-red-500 font-bold text-xl"}
          />
        </div>
      </div>
    </div>
  );
};

export default FindDrivers;
