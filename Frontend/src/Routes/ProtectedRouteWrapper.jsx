// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRouteWrapper = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { setUser } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [userToken] = useState(() => localStorage.getItem("userToken"));
//   const [driverToken] = useState(() => localStorage.getItem("driverToken"));
//   const urls = ["sigup", "signin", "role", "/"];
//   const fetchProfile = async (url, token, userType) => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setUser(userType === "user" ? response.data : response.data.captain);
//         urls.forEach((url) => {
//           if (location.pathname.includes(url)) {
//             navigate(`/${userType}/dashboard`, { replace: true });
//           }
//         });
//       }
//       setLoading(false);
//     } catch (error) {
//       localStorage.removeItem(
//         userType === "user" ? "userToken" : "driverToken"
//       );
//       navigate(`/${userType}/signin`, { replace: true });
//     }
//   };

//   useEffect(() => {
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//     if (!userToken && !driverToken) {
//       if (location.pathname.includes("driver")) {
//         navigate("/driver/signin", { replace: true });
//       } else {
//         navigate("/user/signin", { replace: true });
//       }
//     } else {
//       if (location.pathname.includes("user") && userToken) {
//         fetchProfile(`${API_BASE_URL}/users/profile`, userToken, "user");
//       } else if (location.pathname.includes("driver") && driverToken) {
//         fetchProfile(`${API_BASE_URL}/captains/profile`, driverToken, "driver");
//       } else if (location.pathname.includes("/") && userToken) {
//         fetchProfile(`${API_BASE_URL}/users/profile`, userToken, "user");
//       } else if (location.pathname.includes("/") && driverToken) {
//         fetchProfile(`${API_BASE_URL}/captains/profile`, driverToken, "driver");
//       } else {
//         location.pathname.includes("driver")
//           ? navigate("/driver/signin")
//           : navigate("/user/signin");
//       }
//     }
//   }, [userToken, driverToken, navigate, location.pathname]);

//   return (
//     <>
//       {loading ? (
//         <div className="flex items-center justify-center flex-1">
//           <div className="loader2"></div>
//         </div>
//       ) : (
//         children
//       )}
//     </>
//   );
// };

// export default ProtectedRouteWrapper;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteWrapper = ({ children }) => {
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    userType: null,
  });

  const currentPath = location.pathname;

  // Route definitions
  const publicRoutes = [
    "/driver/signin",
    "/driver/signup",
    "/user/signup",
    "/user/signin",
    "/",
    "/role",
  ];
  const protectedUserRoutes = ["/user/dashboard"];
  const protectedDriverRoutes = ["/driver/dashboard"];

  // Route checks
  const isPublicRoute = publicRoutes.includes(currentPath);
  false;
  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  false;
  const isProtectedDriverRoute = protectedDriverRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  true;
  const isProtectedRoute = isProtectedUserRoute || isProtectedDriverRoute;
  true;

  // Token validation
  const validateToken = async (token, endpoint, userType) => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Set user data in context
        setUser(userType === "user" ? response.data : response.data.captain);
        return { isValid: true, userType };
      }
    } catch (error) {
      console.error(`Token validation failed for ${userType}:`, error);
      localStorage.removeItem(`${userType}Token`);
      setUser(null);
      return { isValid: false, userType: null };
    }
  };

  // Navigation helper
  const navigateTo = (path) => {
    navigate(path, { replace: true });
  };

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const userToken = localStorage.getItem("userToken");
      const driverToken = localStorage.getItem("driverToken");

      if (userToken) {
        const result = await validateToken(
          userToken,
          "http://localhost:4000/users/profile",
          "user"
        );
        setAuthState({
          isLoading: false,
          isAuthenticated: result.isValid,
          userType: result.userType,
        });
      } else if (driverToken) {
        const result = await validateToken(
          driverToken,
          "http://localhost:4000/captains/profile",
          "driver"
        );
        setAuthState({
          isLoading: false,
          isAuthenticated: result.isValid,
          userType: result.userType,
        });
      } else {
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          userType: null,
        });
      }
    };

    checkAuth();
  }, []);

  // Handle redirections
  useEffect(() => {
    if (authState.isLoading) return;

    const { isAuthenticated, userType } = authState;

    // Redirect authenticated users away from public routes
    if (isAuthenticated && isPublicRoute) {
      const dashboard =
        userType === "user" ? "/user/dashboard" : "/driver/dashboard";
      navigateTo(dashboard);
      return;
    }

    // Redirect unauthenticated users away from protected routes
    if (!isAuthenticated && isProtectedRoute) {
      const signIn = isProtectedUserRoute ? "/user/signin" : "/driver/signin";
      navigateTo(signIn);
      return;
    }

    // Redirect users to correct dashboard if accessing wrong protected route
    if (isAuthenticated && isProtectedRoute) {
      if (userType === "user" && isProtectedDriverRoute) {
        navigateTo("/user/dashboard");
        return;
      }
      if (userType === "driver" && isProtectedUserRoute) {
        navigateTo("/driver/dashboard");
        return;
      }
    }
  }, [authState, navigate]);

  // Show loading while checking authentication
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Don't render children if user should be redirected
  const { isAuthenticated, userType } = authState;

  // Block rendering if authenticated user is on public route
  if (isAuthenticated && isPublicRoute) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Block rendering if unauthenticated user is on protected route
  if (!isAuthenticated && isProtectedRoute) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Block rendering if user is on wrong protected route
  if (isAuthenticated && isProtectedRoute) {
    if (
      (userType === "user" && isProtectedDriverRoute) ||
      (userType === "driver" && isProtectedUserRoute)
    ) {
      return (
        <div className="flex items-center justify-center flex-1">
          <div className="loader2"></div>
        </div>
      );
    }
  }

  // Render children only if user has valid access to current route
  return children;
};

export default ProtectedRouteWrapper;
