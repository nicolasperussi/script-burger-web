import React, { useContext } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  IoCodeSlash,
  IoFastFood,
  IoFileTray,
  IoSettings,
} from "react-icons/io5";
import { OrderContext } from "../context/OrdersContext";
import ThemeSwitcher from "./ThemeSwitcher";

const paths = [
  {
    name: "Menu",
    pathname: "products",
    icon: <IoFastFood />,
  },
  {
    name: "Pedidos",
    pathname: "orders",
    icon: <IoFileTray />,
  },
];

document.documentElement.classList.remove("dark");

function Sidebar() {
  let location = useLocation();

  const { orders, isFetchingOrders } = useContext(OrderContext);

  const totalOrdersNumber = !isFetchingOrders ? orders!.length : 0;

  return (
    <nav className="h-[100vh] flex flex-col justify-between items-center py-5 w-32 bg-background-secondary text-text-primary">
      <div className="group flex flex-col justify-center items-center w-20 h-20 rounded-full bg-accent-orange bg-opacity-10 cursor-pointer select-none">
        <IoCodeSlash className="text-4xl text-accent-orange" />
      </div>
      <div className="flex flex-col gap-12">
        {paths.map((path) => (
          <Link
            key={path.pathname}
            to={path.pathname}
            className={`group flex flex-col justify-center items-center w-20 h-20 rounded-xl group-hover:bg-accent-orange group-hover:bg-opacity-10 cursor-pointer select-none ${
              location.pathname.includes(`/${path.pathname}`)
                ? "bg-accent-orange bg-opacity-10"
                : ""
            }`}
          >
            <span
              className={`text-4xl mb-2 group-hover:text-accent-orange relative ${
                location.pathname.includes(`/${path.pathname}`)
                  ? "text-accent-orange"
                  : ""
              }`}
            >
              {totalOrdersNumber > 0 && path.pathname === "orders" && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent-orange border-2 border-white rounded-full top-[-10px] right-[-10px]">
                  {totalOrdersNumber}
                </div>
              )}
              {path.icon}
            </span>
            <p
              className={`group-hover:text-accent-orange ${
                location.pathname.includes(`/${path.pathname}`)
                  ? "text-accent-orange"
                  : ""
              }`}
            >
              {path.name}
            </p>
          </Link>
        ))}
      </div>
      <ThemeSwitcher />
    </nav>
  );
}

export default Sidebar;
