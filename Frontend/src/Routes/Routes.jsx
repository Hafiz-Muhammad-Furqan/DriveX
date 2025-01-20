import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import UserRole from "../Pages/UserRole";
import UserSignup from "../Pages/UserSignup";
import UserSignin from "../Pages/UserSignin";
import DriverSignup from "../Pages/DriverSignup";
import DriverSignin from "../Pages/DriverSignin";
import UserDashboard from "../Pages/UserDashboard";
import DriverDashboard from "../Pages/DriverDashboard";
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
