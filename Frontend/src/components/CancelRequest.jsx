import Btn1 from "../components/Btn1";
import Btn2 from "../components/Btn2";

const CancelRequest = () => {
  return (
    <div className="h-[100dvh] w-full flex items-center flex-col relative">
      <div className=" w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-3 rounded-t-3xl  bg-black transition-opacity duration-300 ">
        <h3 className="text-white text-2xl font-extrabold text-center">
          Do you want to cancel the request?
        </h3>
        <Btn1 label={"Keep Searching"}></Btn1>
        <Btn2
          label={"Cancel Request"}
          style={"text-red-400 text-xl font-semibold"}
        ></Btn2>
      </div>
    </div>
  );
};

export default CancelRequest;
