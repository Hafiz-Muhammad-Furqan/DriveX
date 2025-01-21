import axios from "axios";
import { socket } from "../Utilities/socket";
import Button from "./Button";

const CancelRequest = ({
  cancelRequestPanel,
  setCancelRequestPanel,
  setFindDriverPanel,
  cancelRide,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-3 rounded-t-3xl  bg-black transition-transform duration-200 ease-linear z-[10] ${
        cancelRequestPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h3 className="text-white text-xl font-extrabold text-center">
        Do you want to cancel the request?
      </h3>
      <Button
        label={"Keep Searching"}
        colors={"bg-[#C1F11D]"}
        onclick={() => {
          setCancelRequestPanel(false);
          setFindDriverPanel(true);
        }}
      />
      <Button label={"Cancel Request"} colors={"text-red-500 bg-gray-600"} />
    </div>
  );
};

export default CancelRequest;
