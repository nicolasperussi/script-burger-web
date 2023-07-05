import React, { useContext, useState } from "react";
import Order from "../components/Order";
import OrderVisualizer from "../components/OrderVisualizer";
import { IOrder } from "../types/IOrder";

import Hamburger from "../assets/hamburger.png";
import { OrderContext } from "../context/OrdersContext";
import { AnimatePresence } from "framer-motion";

function Orders() {
  const { orders, isFetchingOrders } = useContext(OrderContext);
  const [visualizeOrder, setVisualizeOrder] = useState<IOrder | null>();

  function handleChangeOrder(order: IOrder) {
    setVisualizeOrder(order);
  }

  function handleResetVisualizer() {
    setVisualizeOrder(null);
  }

  if (!isFetchingOrders)
    return (
      <div className="flex flex-row gap-10 h-full">
        <div className="flex-1 overflow-y-auto">
          <h1 className="text-3xl mb-5 font-bold text-text-primary">Pedidos</h1>
          <AnimatePresence mode="popLayout">
            {orders!.map((order) => (
              <Order
                key={order.id}
                order={order}
                setVisualizeOrder={handleChangeOrder}
              />
            ))}
          </AnimatePresence>
        </div>
        {visualizeOrder ? (
          <OrderVisualizer
            order={visualizeOrder}
            handleResetVisualizer={handleResetVisualizer}
          />
        ) : (
          <div className="bg-background-secondary rounded-3xl p-5 basis-[400px] flex flex-col justify-center items-center">
            <img src={Hamburger} alt="" />
            <h1 className="text-center p-5 text-text-secondary">
              Selecione um pedido para ver mais detalhes
            </h1>
          </div>
        )}
      </div>
    );

  return null;
}

export default Orders;
