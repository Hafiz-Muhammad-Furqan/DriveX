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
        <DriverDashboard />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/driver/rides",
    element: (
      <ProtectedRouteWrapper>
        <TestRides />
      </ProtectedRouteWrapper>
    ),
  },
]);
const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
