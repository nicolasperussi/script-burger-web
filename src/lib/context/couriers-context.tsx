import { ICourier } from "@/types/courier.interface";
import { ReactNode, createContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api";

interface CourierContextType {
  couriers: Array<ICourier>;
  isFetchingCouriers: boolean;
  handleSetCouriers(couriers: Array<ICourier>): void;
}

export const CourierContext = createContext<CourierContextType>({
  couriers: [],
  isFetchingCouriers: true,
  handleSetCouriers: (): void => {},
});

interface CourierProviderProps {
  children: ReactNode;
}

export default function CourierProvider({ children }: CourierProviderProps) {
  const [couriers, setCouriers] = useState<Array<ICourier>>([]);
  const { isFetching } = useQuery("couriers", async () => {
    const response = await api.get("auth/get/couriers");
    setCouriers(response.data);
    return response.data;
  });

  function handleSetCouriers(couriers: Array<ICourier>) {
    setCouriers(couriers);
  }

  return (
    <CourierContext.Provider
      value={{ couriers, isFetchingCouriers: isFetching, handleSetCouriers }}
    >
      {children}
    </CourierContext.Provider>
  );
}
