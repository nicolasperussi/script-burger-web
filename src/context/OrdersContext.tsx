import React, { createContext, ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';
import { IOrder } from '../types/IOrder';
import { IDelivery } from '../types/IDelivery';

type OrderContextType = {
	orders: IOrder[] | null | undefined;
	deliveries: IDelivery[] | null | undefined;
	isFetchingOrders: boolean;
	isFetchingDeliveries: boolean;
};

type ProductProviderProps = {
	children: ReactNode;
};

export const OrderContext = createContext<OrderContextType>({
	orders: [],
	deliveries: [],
	isFetchingOrders: true,
	isFetchingDeliveries: true,
});

function OrderProvider({ children }: ProductProviderProps) {
	const { data: orders, isFetching: isFetchingOrders } =
		useFetch<IOrder[]>('/order');
	const { data: deliveries, isFetching: isFetchingDeliveries } =
		useFetch<IDelivery[]>('/delivery');

	return (
		<OrderContext.Provider
			value={{ orders, deliveries, isFetchingOrders, isFetchingDeliveries }}
		>
			{children}
		</OrderContext.Provider>
	);
}

export default OrderProvider;
