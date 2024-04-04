import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClientProvider } from "react-query";

import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import App from "./App";
import Orders from "./pages/orders";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Chat from "./pages/chat";
import Couriers from "./pages/couriers";
import { isAuthenticated } from "./lib/auth";
import Login from "./pages/login";
import { queryClient } from "./lib/query-client";

const PrivateRoutes = () => {
  const location = useLocation();
  const isUserAuthenticated = isAuthenticated();

  return isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};
const AuthenticationRoutes = () => {
  const location = useLocation();
  const isUserAuthenticated = isAuthenticated();

  return !isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "couriers",
            element: <Couriers />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationRoutes />,
    children: [{ path: "/auth/login", element: <Login /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
