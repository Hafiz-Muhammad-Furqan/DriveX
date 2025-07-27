// import { useNavigate } from "react-router-dom";
// import { useRideContext } from "../context/RideContext";
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import showToast from "../utilities/Toast.js";
// import axios from "axios";

// const RideRequest = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const rides = [
//     {
//       _id: "ride001",
//       user: {
//         fullname: {
//           firstname: "Ali",
//           lastname: "Khan",
//         },
//       },
//       pickup: "Gulshan-e-Iqbal, Karachi",
//       destination: "Saddar, Karachi",
//       fare: 550,
//     },
//     {
//       _id: "ride002",
//       user: {
//         fullname: {
//           firstname: "Sara",
//           lastname: "Ahmed",
//         },
//       },
//       pickup: "North Nazimabad, Karachi",
//       destination: "Bahadurabad, Karachi",
//       fare: 420,
//     },
//     {
//       _id: "ride003",
//       user: {
//         fullname: {
//           firstname: "Zain",
//           lastname: "Raza",
//         },
//       },
//       pickup: "Defence Phase 2, Karachi",
//       destination: "Clifton Block 5, Karachi",
//       fare: 690,
//     },
//   ];
//   const { setNewRides, setOtpPanel, setRidingData } = useRideContext();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (error) {
//       showToast(error);
//       setError(null);
//     }
//   }, [error]);

//   const rideAccept = async (rideId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/rides/accept`,
//         {
//           rideId,
//           captainId: user._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
//           },
//         }
//       );
//       console.log(response.data);

//       setLoading(false);
//       setRidingData(response.data);
//       navigate("/driver/dashboard");
//       setOtpPanel(true);
//     } catch (error) {
//       setLoading(false);
//       if (error?.response && error?.response?.data?.errors) {
//         const validationErrors = error.response.data.errors;
//         setError(validationErrors[0].msg);
//         return;
//       }
//       if (error?.response?.data?.message) {
//         setError(error.response.data.message);
//         return;
//       }
//       setError(error.message);
//     }
//   };
//   return (
//     <div className=" w-[500px] z-[1000] flex-1 flex  items-center flex-col gap-2 py-3 px-2">
//       {!rides || rides.length === 0 ? (
//         <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
//           No Rides Available
//         </div>
//       ) : (
//         rides.map((ride, index) => (
//           <div
//             className="w-full flex flex-col items-start justify-center gap-4 py-5 bg-slate-800 rounded-xl px-3"
//             key={index}
//           >
//             <div className="w-full flex items-center justify-start gap-6">
//               <img
//                 src="/Images/avatar.png"
//                 alt="avatar"
//                 className="size-9 rounded-full bg-black px-1 py-1"
//               />
//               <p className="text-white text-lg font-semibold">
//                 {ride?.user?.fullname?.firstname +
//                   " " +
//                   ride?.user?.fullname?.lastname}
//               </p>
//             </div>
//             <div className="w-full flex items-center justify-start flex-col gap-2">
//               <div className="w-full rounded-lg flex gap-2 items-center justify-start">
//                 <div className="relative">
//                   <div className=" absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-[#C0F11C] flex items-center justify-center">
//                     <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
//                   </div>
//                 </div>
//                 <p className="text-white text-lg pl-1">{ride?.pickup}</p>
//               </div>
//               <div className="w-full gap-2 rounded-lg flex items-center justify-start">
//                 <div className="relative">
//                   <div className=" absolute top-0 left-0 h-[16px] w-[16px] rounded-full bg-red-500 flex items-center justify-center">
//                     <div className="h-[8px] w-[8px] rounded-lg bg-black"></div>
//                   </div>
//                 </div>
//                 <p className="text-white text-lg pl-1">{ride?.destination}</p>
//               </div>
//               <div className="w-full flex items-center justify-start gap-3 pb-3 pt-2">
//                 <i className="ri-cash-line text-[#C1F11D] text-xl pl-1"></i>
//                 <p className="text-white text-lg font-semibold">
//                   PKR {ride?.fare}
//                 </p>
//               </div>
//               <div className="w-full flex items-center justify-between">
//                 <button
//                   className="px-8 py-2 bg-red-800 text-white rounded-lg font-semibold text-base hover:bg-red-900 hover:scale-[1.05] transition-all duration-200 ease-in-out"
//                   onClick={() => {
//                     setNewRides(
//                       rides.filter((filterRide) => {
//                         filterRide !== ride._id;
//                       })
//                     );
//                   }}
//                 >
//                   Ignore
//                 </button>
//                 <button
//                   className="px-8 hover:bg-[#92ac43] hover:scale-[1.05] transition-all duration-200 ease-in-out py-2 bg-[#b4d453] text-white rounded-lg font-semibold text-base"
//                   disabled={loading}
//                   onClick={() => rideAccept(ride._id)}
//                 >
//                   {loading ? <div className="loader1"></div> : "Accept"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default RideRequest;

import { Link, useNavigate } from "react-router-dom";
import { useRideContext } from "../context/RideContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import showToast from "../utilities/Toast.js";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import Button from "./Button.jsx";
const RideRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rides = [
    {
      _id: "ride001",
      user: {
        fullname: {
          firstname: "Ali",
          lastname: "Khan",
        },
      },
      pickup:
        "Gulshan-e-Iqbal, KarachiGulshan-e-Iqbal, KarachiGulshan-e-Iqbal, KarachiGulshan-e-Iqbal, KarachiGulshan-e-Iqbal, Karachi",
      destination: "Saddar, Karachi",
      fare: 550,
    },
    {
      _id: "ride002",
      user: {
        fullname: {
          firstname: "Sara",
          lastname: "Ahmed",
        },
      },
      pickup: "North Nazimabad, Karachi",
      destination: "Bahadurabad, Karachi",
      fare: 420,
    },
    {
      _id: "ride003",
      user: {
        fullname: {
          firstname: "Zain",
          lastname: "Raza",
        },
      },
      pickup: "Defence Phase 2, Karachi",
      destination: "Clifton Block 5, Karachi",
      fare: 690,
    },
  ];

  const { setNewRides, setOtpPanel, setRidingData } = useRideContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);

  const rideAccept = async (rideId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rides/accept`,
        {
          rideId,
          captainId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );
      setLoading(false);
      setRidingData(response.data);
      navigate("/driver/dashboard");
      setOtpPanel(true);
    } catch (error) {
      setLoading(false);
      const validationError =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        error.message;
      setError(validationError);
    }
  };

  return (
    <div className="w-full max-w-md max-h-[90dvh] mx-auto px-4 py-5 overflow-y-auto no-scrollbar bg-slate-800 rounded-lg">
      {!rides || rides.length === 0 ? (
        <div className="flex items-center justify-center h-full flex-col">
          <p className="text-gray-200 text-xl font-semibold py-4">
            No Rides Available
          </p>
          <div
            className={`bg-[#C1F11D] flex items-center  rounded-xl px-4 py-2 cursor-pointer justify-between gap-2`}
          >
            <MoveLeft strokeWidth={2} size={20} />
            <Link
              to="/driver/dashboard"
              className="font-semibold  text-center w-full"
            >
              Go Back
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center relative">
            <MoveLeft
              strokeWidth={2}
              className="text-white cursor-pointer text-2xl absolute left-2"
              onClick={() => navigate("/driver/dashboard")}
            />
            <h3 className="text-gray-100 text-lg font-semibold ">
              Available Rides
            </h3>
          </div>
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="bg-gray-900 rounded-2xl shadow-xl p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl border-gray-600 border-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/Images/avatar.png"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-gray-700"
                />
                <p className="text-white text-lg font-semibold">
                  {ride?.user?.fullname?.firstname}{" "}
                  {ride?.user?.fullname?.lastname}
                </p>
              </div>

              <div className="text-white text-sm flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center  flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-black"></span>
                  </span>
                  <span className="pl-1 tracking-wide">{ride.pickup}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-black"></span>
                  </span>
                  <span className="pl-1 tracking-wide">{ride.destination}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#C0F11C] text-base font-semibold">
                <i className="ri-cash-line text-xl"></i>
                <span className="text-white">PKR {ride.fare}</span>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  className="w-[48%] py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all"
                  onClick={() => {
                    setNewRides((prev) =>
                      prev.filter((r) => r._id !== ride._id)
                    );
                  }}
                >
                  Ignore
                </button>
                <button
                  className={`w-[48%] py-2 rounded-lg font-semibold text-sm ${
                    loading
                      ? "bg-[#92ac43]/70 text-white cursor-not-allowed"
                      : "bg-[#b4d453] hover:bg-[#92ac43] text-white"
                  } transition-all`}
                  onClick={() => rideAccept(ride._id)}
                  disabled={loading}
                >
                  {loading ? <div className="loader1 mx-auto"></div> : "Accept"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideRequest;
