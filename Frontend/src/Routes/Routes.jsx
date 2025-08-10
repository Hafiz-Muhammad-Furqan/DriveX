import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import UserRole from "../pages/UserRole";
import UserSignup from "../pages/UserSignup";
import UserSignin from "../pages/UserSignin";
import DriverSignup from "../pages/DriverSignup";
import DriverSignin from "../pages/DriverSignin";
import UserDashboard from "../pages/UserDashboard";
import DriverDashboard from "../pages/DriverDashboard";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";
import RideRequest from "../components/RideRequest";
import { RideProvider } from "../context/RideContext";
import PaymentForm from "../components/PaymentForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteWrapper>
        <Home />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/role",
    element: (
      <ProtectedRouteWrapper>
        <UserRole />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/user/signup",
    element: (
      <ProtectedRouteWrapper>
        <UserSignup />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/user/signin",
    element: (
      <ProtectedRouteWrapper>
        <UserSignin />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/driver/signup",
    element: (
      <ProtectedRouteWrapper>
        <DriverSignup />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/driver/signin",
    element: (
      <ProtectedRouteWrapper>
        <DriverSignin />
      </ProtectedRouteWrapper>
    ),
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
  {
    path: "/user/payment",
    element: (
      <ProtectedRouteWrapper>
        <PaymentForm />
      </ProtectedRouteWrapper>
    ),
  },
]);
const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
