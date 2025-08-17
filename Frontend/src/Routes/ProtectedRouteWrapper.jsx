import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteWrapper = ({ children }) => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    isLoading: true,
    hasUserToken: false,
    hasDriverToken: false,
    validUserToken: false,
    validDriverToken: false,
  });

  const currentPath = location.pathname;

  const publicRoutes = ["/", "/role"];
  const userAuthRoutes = ["/user/signin", "/user/signup"];
  const driverAuthRoutes = ["/driver/signin", "/driver/signup"];
  const userProtectedRoutes = ["/user/dashboard", "/user/payment"];
  const driverProtectedRoutes = ["/driver/dashboard", "/driver/rides"];

  const isPublicRoute = publicRoutes.includes(currentPath);
  const isUserAuthRoute = userAuthRoutes.includes(currentPath);
  const isDriverAuthRoute = driverAuthRoutes.includes(currentPath);
  const isUserProtectedRoute = userProtectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  const isDriverProtectedRoute = driverProtectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  const routeRequiresUserAuth = isUserAuthRoute || isUserProtectedRoute;
  const routeRequiresDriverAuth = isDriverAuthRoute || isDriverProtectedRoute;

  const validateToken = async (token, endpoint, tokenType) => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData =
          tokenType === "user" ? response.data : response.data.captain;

        if (
          !user ||
          (routeRequiresUserAuth && tokenType === "user") ||
          (routeRequiresDriverAuth && tokenType === "driver")
        ) {
          setUser(userData);
        }

        return true;
      }
    } catch (error) {
      console.error(`Token validation failed for ${tokenType}:`, error);
      localStorage.removeItem(`${tokenType}Token`);
      return false;
    }
  };

  const navigateTo = (path) => {
    navigate(path, { replace: true });
  };

  const checkAuth = async () => {
    const userToken = localStorage.getItem("userToken");
    const driverToken = localStorage.getItem("driverToken");

    const hasUserToken = !!userToken;
    const hasDriverToken = !!driverToken;

    let validUserToken = false;
    let validDriverToken = false;

    if (isUserAuthRoute || isUserProtectedRoute) {
      if (hasUserToken) {
        validUserToken = await validateToken(
          userToken,
          `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
          "user"
        );
      }
    }

    if (isDriverAuthRoute || isDriverProtectedRoute) {
      if (hasDriverToken) {
        validDriverToken = await validateToken(
          driverToken,
          `${import.meta.env.VITE_API_BASE_URL}/captains/profile`,
          "driver"
        );
      }
    }

    if (isPublicRoute) {
      if (hasUserToken) {
        validUserToken = await validateToken(
          userToken,
          `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
          "user"
        );
      } else if (hasDriverToken) {
        validDriverToken = await validateToken(
          driverToken,
          `${import.meta.env.VITE_API_BASE_URL}/captains/profile`,
          "driver"
        );
      }
    }

    if (!validUserToken && !validDriverToken) {
      setUser(null);
    }

    setAuthState({
      isLoading: false,
      hasUserToken,
      hasDriverToken,
      validUserToken,
      validDriverToken,
    });
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      const userToken = localStorage.getItem("userToken");
      const driverToken = localStorage.getItem("driverToken");

      if (userToken || driverToken) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          hasUserToken: !!userToken,
          hasDriverToken: !!driverToken,
          validUserToken: !!userToken,
          validDriverToken: !!driverToken,
        }));
      }
    }
  }, [user]);

  useEffect(() => {
    if (authState.isLoading) return;

    const { validUserToken, validDriverToken } = authState;

    if (isPublicRoute) {
      if (validUserToken) {
        navigateTo("/user/dashboard");
        return;
      }
      if (validDriverToken) {
        navigateTo("/driver/dashboard");
        return;
      }
      return;
    }

    if (isUserAuthRoute) {
      if (validUserToken) {
        navigateTo("/user/dashboard");
        return;
      }
      return;
    }

    if (isDriverAuthRoute) {
      if (validDriverToken) {
        navigateTo("/driver/dashboard");
        return;
      }
      return;
    }

    if (isUserProtectedRoute) {
      if (!validUserToken) {
        navigateTo("/user/signin");
        return;
      }
      return;
    }

    if (isDriverProtectedRoute) {
      if (!validDriverToken) {
        navigateTo("/driver/signin");
        return;
      }
      return;
    }
  }, [authState, currentPath]);

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  const { validUserToken, validDriverToken } = authState;

  if (isUserAuthRoute && validUserToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  if (isDriverAuthRoute && validDriverToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  if (isUserProtectedRoute && !validUserToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  if (isDriverProtectedRoute && !validDriverToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRouteWrapper;
