import Button from "./Button";

const CancelRequest = () => {
  return (
    <div className="w-full flex items-center flex-col relative">
      <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-3 rounded-t-3xl  bg-black transition-opacity duration-300 ">
        <h3 className="text-white text-xl font-extrabold text-center">
          Do you want to cancel the request?
        </h3>
        <Button label={"Keep Searching"} colors={"bg-[#C1F11D]"} />
        <Button label={"Cancel Request"} colors={"text-red-500 bg-zinc-600"} />
      </div>
    </div>
  );
};

export default CancelRequest;
