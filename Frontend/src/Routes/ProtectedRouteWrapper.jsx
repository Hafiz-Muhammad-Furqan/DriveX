import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userToken] = useState(() => localStorage.getItem("userToken"));
  const [driverToken] = useState(() => localStorage.getItem("driverToken"));

  const fetchProfile = async (url, token, userType) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(userType === "user" ? response.data : response.data.captain);
        setLoading(false);
      }
    } catch (error) {
      localStorage.removeItem(
        userType === "user" ? "userToken" : "driverToken"
      );
      navigate(`/${userType}/signin`, { replace: true });
    }
  };

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!userToken && !driverToken) {
      if (location.pathname.includes("driver")) {
        navigate("/driver/signin", { replace: true });
      } else {
        navigate("/user/signin", { replace: true });
      }
    } else {
      if (location.pathname.includes("user") && userToken) {
        fetchProfile(`${API_BASE_URL}/users/profile`, userToken, "user");
      } else if (location.pathname.includes("driver") && driverToken) {
        fetchProfile(`${API_BASE_URL}/captains/profile`, driverToken, "driver");
      } else {
        location.pathname.includes("driver")
          ? navigate("/driver/signin")
          : navigate("/user/signin");
      }
    }
  }, [userToken, driverToken, navigate, location.pathname]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="loader2"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRouteWrapper;
