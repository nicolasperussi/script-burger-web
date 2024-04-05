import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClientProvider } from "react-query";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Orders from "./pages/orders";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Chat from "./pages/chat";
import Couriers from "./pages/couriers";
import Login from "./pages/login";
import { queryClient } from "./lib/query-client";
import CourierProvider from "./lib/context/couriers-context";
import { PrivateRoutes } from "./lib/routes/private-routes";
import { AuthenticationRoutes } from "./lib/routes/authentication-routes";
import OrderInfo from "./pages/order-info";

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
            path: "order/:id",
            element: <OrderInfo />,
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
      <CourierProvider>
        <RouterProvider router={router} />
      </CourierProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
