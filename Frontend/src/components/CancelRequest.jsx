import Button from "./Button";

const CancelRequest = ({
  cancelRequestPanel,
  setCancelRequestPanel,
  setFindDriverPanel,
  setUserRidePanel,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col fixed bottom-0 px-4 gap-5 py-3 rounded-t-3xl  bg-black transition-transform duration-200 ease-linear z-[10] ${
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
      <Button
        label={"Cancel Request"}
        colors={"text-red-500 bg-zinc-600"}
        onclick={() => {
          setCancelRequestPanel(false);
          setUserRidePanel(true);
        }}
      />
    </div>
  );
};

export default CancelRequest;
