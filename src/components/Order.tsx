import React from "react";
import { BRL } from "../services/utils";
import { IOrder } from "../types/IOrder";
import { motion } from "framer-motion";

type OrderProps = {
  order: IOrder;
  setVisualizeOrder: (order: IOrder) => void;
};

function getOrderStatus(orderStatus: string): {
  status: string;
  color: string;
} {
  if (orderStatus === "WAITING")
    return { status: "Em espera", color: "bg-red-700" };
  if (orderStatus === "IN_PRODUCTION")
    return { status: "Em produção", color: "bg-amber-500" };
  return { status: "Finalizada", color: "bg-green-700" };
}

function Order({ order, setVisualizeOrder }: OrderProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
      className="mb-3 bg-white p-5 rounded-3xl flex flex-row justify-between items-center cursor-pointer select-none"
      onClick={() => setVisualizeOrder(order)}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">
          Pedido #{order.id.split("-")[0].toUpperCase()}
        </h1>
        <h2 className="text-neutral-700">
          Produtos: {order.productList.length}
        </h2>
      </div>
      <div className="text-right">
        <h3 className="text-neutral-500 ">
          {new Date(order.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h3>
        <div className="flex flex-row gap-5 items-center mt-3">
          <h2 className="font-semibold text-lg">{BRL(order.totalPrice)}</h2>
          <span
            className={`${
              getOrderStatus(order.status).color
            } text-white p-1 px-3 rounded-3xl w-36 text-center`}
          >
            {getOrderStatus(order.status).status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Order;
