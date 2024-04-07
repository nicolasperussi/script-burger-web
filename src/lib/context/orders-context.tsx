import { IOrder } from "@/types/order.interface";
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../api";
import { ICourier } from "@/types/courier.interface";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

interface OrderContextType {
  orders: Array<IOrder>;
  handleSetOrders(orders: Array<IOrder>): void;
  handleAdvanceOrder(orderId: number): void;
  handleCancelOrder(orderId: number): void;
  handleAssignCourier(orderId: number, courier: ICourier): void;
}

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  handleSetOrders: (): void => {},
  handleAdvanceOrder: (): void => {},
  handleCancelOrder: (): void => {},
  handleAssignCourier: (): void => {},
});

interface OrderProviderProps {
  children: ReactNode;
}

export default function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Array<IOrder>>([]);

  async function fetchOrders() {
    const response = await api.get("orders");
    setOrders(response.data);
  }

  useEffect(() => {
    fetchOrders();
    const socket = new SockJS("http://localhost:3003/scriptburger-ws");
    const stompClient = Stomp.over(socket);
    // Check if WebSocket is already open
    stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
      const stompSubscription = stompClient.subscribe(
        "/topic/orders",
        (message) => {
          // Handle received messages
          setOrders((prevOrders) => [JSON.parse(message.body), ...prevOrders]);
        }
      );

      // Return the unsubscribe function from the subscribe call
      return () => {
        stompSubscription.unsubscribe();
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      };
    });
  }, []);

  function handleSetOrders(orders: Array<IOrder>) {
    setOrders(orders);
  }

  function handleAdvanceOrder(orderId: number) {
    api.patch(`/orders/${orderId}`).then(() => {
      handleSetOrders(
        orders.map((order: IOrder) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  order.status === "WAITING"
                    ? "IN_PRODUCTION"
                    : order.status === "IN_PRODUCTION"
                    ? "IN_TRANSIT"
                    : "DELIVERED",
              }
            : order
        )
      );
    });
  }

  function handleCancelOrder(orderId: number) {
    api.patch(`/orders/cancel/${orderId}`).then(() =>
      handleSetOrders(
        orders.map((order: IOrder) =>
          order.id === orderId && order.status !== "DELIVERED"
            ? {
                ...order,
                status: "CANCELED",
              }
            : order
        )
      )
    );
  }

  function handleAssignCourier(orderId: number, courier: ICourier) {
    api.patch(`/orders/${orderId}/courier/${courier.id}`).then(() => {
      setOrders(
        orders.map((order: IOrder) =>
          order.id === orderId ? { ...order, courier } : order
        )
      );
    });
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        handleSetOrders,
        handleAdvanceOrder,
        handleCancelOrder,
        handleAssignCourier,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
