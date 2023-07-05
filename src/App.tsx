import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Root from "./pages/Root";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrdersContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>404 not found!</div>,
      children: [
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "products",
          element: <Products />,
        },
      ],
    },
  ]);

  // TODO: add dark mode switching
  // TODO: choose the right accent colors (orange, red, yellow and green) and adequate colors for light mode

  return (
    <OrderProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </OrderProvider>
  );
}

export default App;
