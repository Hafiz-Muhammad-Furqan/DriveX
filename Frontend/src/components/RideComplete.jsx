import axios from "axios";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import showToast from "../utilities/Toast";

const RideComplete = ({ rideCompletePanel, startRide }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { sertClientSecret } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error]);

  const handlePayment = async (rideId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-intent`,
        {
          rideId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      const clientSecret = response.data.clientSecret;
      sertClientSecret(clientSecret);
      navigate("/user/payment");
    } catch (error) {
      console.log(error.message);

      if (error?.response?.data?.message) {
        setError(error.response.data.message);
        return;
      }
      setError("Payment creation failed ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center flex-col absolute bottom-0 px-1 gap-3 py-4 rounded-t-3xl bg-black transition-transform duration-200 ease-linear  ${
        rideCompletePanel ? "translate-y-0" : "translate-y-full"
      } `}
    >
      <div className="w-full flex flex-col items-center justify-center gap-5 px-3 py-4">
        <h1 className="text-white text-2xl font-bold tracking-wider leading-3">
          Ride Completed !
        </h1>

        <p className="text-gray-400 text-center">
          Your ride is complete. Please make payment to continue.
        </p>
        <Button
          label={loading ? "Processing..." : "Make Payment"}
          colors={"bg-[#C1F11D]"}
          onclick={() => handlePayment(startRide._id)}
          disable={loading}
        />
      </div>
    </div>
  );
};

export default RideComplete;
