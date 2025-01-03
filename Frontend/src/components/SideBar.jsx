import { useState } from "react";
import Btn1 from "../components/Btn1";

const SideBar = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <i
        className={`ri-menu-fill absolute text-lg font-semibold top-2 left-2 text-white z-[1] px-[10px] py-1 bg-zinc-800 rounded-full cursor-pointer ${
          SidebarOpen && "hidden"
        }`}
        onClick={() => setSidebarOpen(true)}
      ></i>
      <div
        className={`w-full h-full absolute bg-[#141414] z-[1]  transition-transform duration-200 ease-linear ${
          SidebarOpen
            ? "translate-x-0 shadow-2xl shadow-black"
            : "-translate-x-full"
        } `}
      >
        <div className="w-full flex items-center justify-start  gap-3 p-4">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1"
          />
          <h2 className="text-white font-medium flex-grow">Hafiz Muhammad </h2>
          <i
            onClick={() => setSidebarOpen(false)}
            className="ri-arrow-left-long-line items-end text-2xl font-semibold text-white"
          ></i>
        </div>
        <div className="w-full absolute bottom-8 flex flex-col gap-4 px-4">
          <Btn1 label={"Driver Mode"} style={"w-[90%] py-2"} />
          <Btn1 label={"Logout"} style={"w-[90%] py-2 bg-red-500 text-white"} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
