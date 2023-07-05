import React from "react";
import { BRL } from "../services/utils";
import { IDelivery } from "../types/IDelivery";
import { motion } from "framer-motion";

type DeliveryProps = {
  delivery: IDelivery;
  setVisualizeDelivery: (delivery: IDelivery) => void;
};

function getDeliveryStatus(orderStatus: string): {
  status: string;
  color: string;
} {
  if (orderStatus === "WAITING")
    return { status: "Em espera", color: "bg-red-700" };
  if (orderStatus === "IN_PRODUCTION")
    return { status: "Em produção", color: "bg-amber-500" };
  if (orderStatus === "IN_TRANSIT")
    return { status: "Em trânsito", color: "bg-blue-700" };
  return { status: "Finalizada", color: "bg-green-700" };
}

function Delivery({ delivery, setVisualizeDelivery }: DeliveryProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring" }}
      className="mb-3 bg-background-secondary p-5 rounded-3xl flex flex-row justify-between items-center cursor-pointer select-none"
      onClick={() => setVisualizeDelivery(delivery)}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-text-primary">
          Pedido #{delivery.id.split("-")[0].toUpperCase()}
        </h1>
        <h2 className="text-text-secondary">
          Produtos: {delivery.productList.length}
        </h2>
      </div>
      <div className="text-right">
        <h3 className="text-text-secondary">
          {new Date(delivery.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h3>
        <div className="flex flex-row gap-5 items-center mt-3">
          <h2 className="font-semibold text-lg text-text-primary">
            {BRL(delivery.totalPrice)}
          </h2>
          <span
            className={`${
              getDeliveryStatus(delivery.status).color
            } text-white p-1 px-3 rounded-3xl w-36 text-center`}
          >
            {getDeliveryStatus(delivery.status).status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Delivery;
