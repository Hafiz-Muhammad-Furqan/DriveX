import { useState } from "react";
import Button from "./Button";
import { AlignJustify } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const { user } = useAuth();
  const url = useLocation();
  const [SidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {!SidebarOpen && (
        <div
          onClick={() => setSidebarOpen(true)}
          className="bg-gray-800 flex items-center justify-center text-white z-10 absolute top-2 left-2 rounded-lg cursor-pointer"
        >
          <AlignJustify size={22} className="text-white m-1 flex " />
        </div>
      )}

      <div
        className={`w-full h-full absolute bg-[#141414] z-[3]  transition-transform duration-100 ease-linear rounded-lg ${
          SidebarOpen
            ? "translate-x-0 shadow-2xl shadow-black"
            : "-translate-x-full"
        } `}
      >
        <div className="w-full flex items-center justify-start gap-3 px-4 py-5 ">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border border-gray-400"
          />
          <h2 className="text-white font-semibold flex-grow tracking-wider">
            {user?.fullname?.firstname} {user?.fullname?.lastname}
          </h2>
          <i
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer ri-arrow-left-long-line items-end text-2xl font-semibold text-white"
          ></i>
        </div>
        <div className="w-full absolute bottom-8 flex flex-col gap-4 px-4 items-center justify-center">
          {url.pathname.includes("/driver") && (
            <Button
              label={"All Rides"}
              colors={"bg-[#C1F11D]"}
              path={"/driver/rides"}
            />
          )}
          <Button
            label={`${
              url.pathname.includes("/user") ? "Driver Mode" : "User Mode"
            }`}
            colors={"bg-[#C1F11D]"}
            path={`${
              url.pathname.includes("/user")
                ? "/driver/dashboard"
                : "/user/dashboard"
            }`}
          />
          <Button label={"Logout"} colors={"bg-red-500 text-white"} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
