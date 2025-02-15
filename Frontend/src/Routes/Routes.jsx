import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import UserRole from "../pages/UserRole";
import UserSignup from "../pages/UserSignup";
import UserSignin from "../pages/UserSignin";
import DriverSignup from "../pages/DriverSignup";
import DriverSignin from "../pages/DriverSignin";
import UserDashboard from "../pages/UserDashboard";
import DriverDashboard from "../pages/DriverDashboard";
import TestRides from "../Components/TestRides";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";
import RideRequest from "../Components/RideRequest";
import { RideProvider } from "../context/RideContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/role",
    element: <UserRole />,
  },
  {
    path: "/user/signup",
    element: <UserSignup />,
  },
  {
    path: "/user/signin",
    element: <UserSignin />,
  },
  {
    path: "/driver/signup",
    element: <DriverSignup />,
  },
  {
    path: "/driver/signin",
    element: <DriverSignin />,
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRouteWrapper>
        <UserDashboard />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/driver/dashboard",
    element: (
      <ProtectedRouteWrapper>
        <RideProvider>
          <DriverDashboard />
        </RideProvider>
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/driver/rides",
    element: (
      <ProtectedRouteWrapper>
        <RideProvider>
          <RideRequest />
        </RideProvider>
      </ProtectedRouteWrapper>
    ),
  },
]);
const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
