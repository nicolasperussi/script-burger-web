import { useLocation, Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth";

export const AuthenticationRoutes = () => {
  const location = useLocation();
  const isUserAuthenticated = isAuthenticated();

  return !isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
