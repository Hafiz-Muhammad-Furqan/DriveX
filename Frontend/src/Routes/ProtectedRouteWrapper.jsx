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

  // Route classifications
  const publicRoutes = ["/", "/role"];
  const userAuthRoutes = ["/user/signin", "/user/signup"];
  const driverAuthRoutes = ["/driver/signin", "/driver/signup"];
  const userProtectedRoutes = ["/user/dashboard"];
  const driverProtectedRoutes = ["/driver/dashboard"];

  // Route checks
  const isPublicRoute = publicRoutes.includes(currentPath);
  const isUserAuthRoute = userAuthRoutes.includes(currentPath);
  const isDriverAuthRoute = driverAuthRoutes.includes(currentPath);
  const isUserProtectedRoute = userProtectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  const isDriverProtectedRoute = driverProtectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  // Determine what the current route requires
  const routeRequiresUserAuth = isUserAuthRoute || isUserProtectedRoute;
  const routeRequiresDriverAuth = isDriverAuthRoute || isDriverProtectedRoute;

  // Token validation
  const validateToken = async (token, endpoint, tokenType) => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Set user data in context if it's the primary role
        const userData =
          tokenType === "user" ? response.data : response.data.captain;

        // Only set user in context if we don't already have user data
        // or if this validation is for the current route's required role
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

  // Navigation helper
  const navigateTo = (path) => {
    navigate(path, { replace: true });
  };

  // Comprehensive authentication check
  const checkAuth = async () => {
    const userToken = localStorage.getItem("userToken");
    const driverToken = localStorage.getItem("driverToken");

    // Initial token presence check
    const hasUserToken = !!userToken;
    const hasDriverToken = !!driverToken;

    // Validate tokens if they exist
    let validUserToken = false;
    let validDriverToken = false;

    if (hasUserToken) {
      validUserToken = await validateToken(
        userToken,
        "http://localhost:4000/users/profile",
        "user"
      );
    }

    if (hasDriverToken) {
      validDriverToken = await validateToken(
        driverToken,
        "http://localhost:4000/captains/profile",
        "driver"
      );
    }

    // If no valid tokens, clear user context
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

  // Check auth on mount and when location changes
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // Also check when user context changes (for immediate updates after login)
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

  // Handle redirections based on enhanced logic
  useEffect(() => {
    if (authState.isLoading) return;

    const { validUserToken, validDriverToken } = authState;

    // Handle public routes (always allow)
    if (isPublicRoute) {
      return;
    }

    // Handle user authentication routes (/user/signin, /user/signup)
    if (isUserAuthRoute) {
      if (validUserToken) {
        // Already have valid user token, redirect to user dashboard
        navigateTo("/user/dashboard");
        return;
      }
      // No valid user token, allow access to signin/signup
      return;
    }

    // Handle driver authentication routes (/driver/signin, /driver/signup)
    if (isDriverAuthRoute) {
      if (validDriverToken) {
        // Already have valid driver token, redirect to driver dashboard
        navigateTo("/driver/dashboard");
        return;
      }
      // No valid driver token, allow access to signin/signup
      return;
    }

    // Handle user protected routes (/user/dashboard, etc.)
    if (isUserProtectedRoute) {
      if (!validUserToken) {
        // No valid user token, redirect to user signin
        navigateTo("/user/signin");
        return;
      }
      // Has valid user token, allow access
      return;
    }

    // Handle driver protected routes (/driver/dashboard, etc.)
    if (isDriverProtectedRoute) {
      if (!validDriverToken) {
        // No valid driver token, redirect to driver signin
        navigateTo("/driver/signin");
        return;
      }
      // Has valid driver token, allow access
      return;
    }

    // If none of the above conditions match, it might be an unknown route
    // Let it render (could be a 404 page or other route)
  }, [authState, currentPath]);

  // Show loading while checking authentication
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Determine if current route access should be blocked
  const { validUserToken, validDriverToken } = authState;

  // Block user auth routes if already authenticated as user
  if (isUserAuthRoute && validUserToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Block driver auth routes if already authenticated as driver
  if (isDriverAuthRoute && validDriverToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Block user protected routes if no valid user token
  if (isUserProtectedRoute && !validUserToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Block driver protected routes if no valid driver token
  if (isDriverProtectedRoute && !validDriverToken) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader2"></div>
      </div>
    );
  }

  // Render children if all checks pass
  return children;
};

export default ProtectedRouteWrapper;
