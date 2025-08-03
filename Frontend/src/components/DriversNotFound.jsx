import React from "react";
import Button from "./Button";

const DriversNotFound = ({
  NoDriversFound,
  setNoDriversFound,
  setFindDriverPanel,
  setCancelRequestPanel,
}) => {
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-4 gap-5 py-4 rounded-t-3xl  bg-black  transition-transform duration-200 ease-linear z-[10] ${
        NoDriversFound ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <h1 className="text-white text-xl font-semibold tracking-wide text-center">
        No drivers available at the moment
      </h1>
      <Button
        label={"Try Again"}
        colors={"bg-[#C1F11D] text-black font-semibold"}
        onclick={() => {
          setNoDriversFound(false);
          setFindDriverPanel(true);
        }}
      />
      <Button
        label={"Cancel Request"}
        colors={"bg-zinc-800 text-red-500 tracking-wider"}
        onclick={() => {
          setCancelRequestPanel(true);
          setNoDriversFound(false);
        }}
      />
    </div>
  );
};

export default DriversNotFound;
