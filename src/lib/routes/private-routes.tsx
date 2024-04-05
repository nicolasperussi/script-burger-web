import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth";

export const PrivateRoutes = () => {
  const location = useLocation();
  const isUserAuthenticated = isAuthenticated();

  return isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};
