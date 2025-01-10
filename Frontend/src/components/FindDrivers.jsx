import Button from "../Components/Button";

const FindDrivers = ({
  setFindDriverPanel,
  findDriverPanel,
  setCancelRequestPanel,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col fixed bottom-0 px-4 gap-4 py-3 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        findDriverPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
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
        <div className="w-full flex">
          <i className="ri-cash-line text-[#C1F11D] text-xl"></i>
          <p className="text-white text-start w-full text-xl  font-semibold pl-6">
            PKR 1 ,000
          </p>
        </div>
        <Button
          label={"Cancel Request"}
          colors={"bg-zinc-600 text-red-500"}
          onclick={() => {
            setCancelRequestPanel(true);
            setFindDriverPanel(false);
          }}
        />
      </div>
    </div>
  );
};

export default FindDrivers;
