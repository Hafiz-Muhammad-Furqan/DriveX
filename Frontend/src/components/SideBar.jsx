import { useState } from "react";
import Button from "./Button";
import { AlignJustify, Hand } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import showToast from "../utilities/Toast";
import axios from "axios";

const SideBar = () => {
  const { user } = useAuth();
  const url = useLocation();
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const HandleLogout = async () => {
    setLoading(true);
    let token;
    let userType;
    if (url.pathname.includes("/user")) {
      token = localStorage.getItem("userToken");
      userType = "users";
    } else if (url.pathname.includes("/driver")) {
      token = localStorage.getItem("driverToken");
      userType = "captains";
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${userType}/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        userType === "users"
          ? localStorage.removeItem("userToken")
          : localStorage.removeItem("driverToken");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log("Logout failed:", error);
      showToast("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {!SidebarOpen && (
        <div
          className="flex items-center justify-center bg-[#0f172a] absolute top-2 left-2 rounded-full  px-2 py-2 cursor-pointer "
          onClick={() => setSidebarOpen(true)}
        >
          <AlignJustify
            size={20}
            strokeWidth={2.5}
            className="text-white  flex"
          />
        </div>
      )}

      <div
        className={`w-full h-full absolute bg-[#141414] z-[1000]  transition-transform duration-100 ease-linear rounded-lg ${
          SidebarOpen
            ? "translate-x-0 shadow-2xl shadow-black"
            : "-translate-x-full"
        } `}
      >
        <div className="w-full flex items-center justify-start gap-3 px-4 py-5 ">
          <img
            src="/Images/avatar.png"
            alt="avatar"
            className="w-11 h-11 rounded-full bg-black px-1 py-1 border-2 border-gray-400"
          />
          <h2 className="text-white font-semibold flex-grow tracking-wider text-xl">
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
            colors={"bg-[#C1F11D] tracking-wider"}
            path={`${
              url.pathname.includes("/user")
                ? "/driver/dashboard"
                : "/user/dashboard"
            }`}
          />
          <button
            className={`bg-red-500 text-white tracking-wider flex items-center w-[96%] rounded-xl py-2 cursor-pointer`}
            onClick={HandleLogout}
            disabled={loading}
          >
            <p className="font-semibold text-lg text-center w-full">
              {loading ? "Logging out..." : "Logout"}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
