import React, { useContext, useState } from "react";
import Order from "../components/Order";
import OrderVisualizer from "../components/OrderVisualizer";
import { IOrder } from "../types/IOrder";

import Hamburger from "../assets/hamburger.png";
import { OrderContext } from "../context/OrdersContext";
import Button from "../components/subcomponents/button.components";
import { IDelivery } from "../types/IDelivery";
import { AnimatePresence } from "framer-motion";

function Orders() {
  const { orders, isFetchingOrders, deliveries, isFetchingDeliveries } =
    useContext(OrderContext);
  const [visualizeOrder, setVisualizeOrder] = useState<IOrder | null>();
  const [visualizeDelivery, setVisualizeDelivery] =
    useState<IDelivery | null>();

  function handleChangeOrder(order: IOrder) {
    setVisualizeDelivery(null);
    setVisualizeOrder(order);
  }
  function handleChangeDelivery(delivery: IDelivery) {
    setVisualizeOrder(null);
    setVisualizeDelivery(delivery);
  }

  function handleResetVisualizer() {
    setVisualizeDelivery(null);
    setVisualizeOrder(null);
  }

  const [viewDeliveries, setViewDeliveries] = useState(false);

  if (!isFetchingOrders && !isFetchingDeliveries)
    return (
      <div className="flex flex-row gap-10 h-full">
        <div className="flex-1 overflow-y-auto">
          <h1 className="text-3xl mb-5 font-bold text-text-primary">Pedidos</h1>
          <div className="mb-5 flex flex-row gap-5">
            <Button
              variant={viewDeliveries ? "text_orange" : "fill_orange"}
              title="Comer no local"
              size="md"
              onClick={() => setViewDeliveries(false)}
            />
            <Button
              variant={viewDeliveries ? "fill_orange" : "text_orange"}
              title="Entregas"
              size="md"
              onClick={() => setViewDeliveries(true)}
            />
          </div>
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
