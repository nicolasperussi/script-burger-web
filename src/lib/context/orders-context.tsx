import { IOrder } from "@/types/order.interface";
import { ReactNode, createContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { ICourier } from "@/types/courier.interface";

interface OrderContextType {
  orders: Array<IOrder>;
  isFetchingOrders: boolean;
  handleSetOrders(orders: Array<IOrder>): void;
  handleAdvanceOrder(orderId: number): void;
  handleCancelOrder(orderId: number): void;
  handleAssignCourier(orderId: number, courier: ICourier): void;
}

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  isFetchingOrders: true,
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
  const { isFetching } = useQuery("orders", async () => {
    const response = await api.get("orders");
    setOrders(response.data);
    return response.data;
  });

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
        isFetchingOrders: isFetching,
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
