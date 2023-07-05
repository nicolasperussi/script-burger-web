import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IOrder } from "../types/IOrder";
import socketIo from "socket.io-client";
import { api } from "../services/api";

type OrderContextType = {
  orders: IOrder[] | null | undefined;
  isFetchingOrders: boolean;
  handleSetOrders(orders: IOrder[]): void;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  isFetchingOrders: true,
  handleSetOrders: (orders: IOrder[]) => {},
});

function OrderProvider({ children }: ProductProviderProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(true);

  function handleSetOrders(orders: IOrder[]) {
    setOrders(orders);
  }
  useEffect(() => {
    api
      .get("/order")
      .then((response) => setOrders(response.data))
      .finally(() => setIsFetchingOrders(false));
  }, []);

  useEffect(() => {
    const socket = socketIo("http://localhost:3003", {
      transports: ["websocket"],
    });

    socket.on("order@new", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        isFetchingOrders,
        handleSetOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
