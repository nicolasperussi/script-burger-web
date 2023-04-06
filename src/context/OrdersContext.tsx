import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { IOrder } from '../types/IOrder';
import { IDelivery } from '../types/IDelivery';
import socketIo from 'socket.io-client';
import { api } from '../services/api';

type OrderContextType = {
	orders: IOrder[] | null | undefined;
	deliveries: IDelivery[] | null | undefined;
	isFetchingOrders: boolean;
	isFetchingDeliveries: boolean;
	handleSetOrders(orders: IOrder[]): void;
	handleSetDeliveries(deliveries: IDelivery[]): void;
};

type ProductProviderProps = {
	children: ReactNode;
};

export const OrderContext = createContext<OrderContextType>({
	orders: [],
	deliveries: [],
	isFetchingOrders: true,
	isFetchingDeliveries: true,
	handleSetOrders: (orders: IOrder[]) => {},
	handleSetDeliveries: (deliveries: IDelivery[]) => {},
});

function OrderProvider({ children }: ProductProviderProps) {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [isFetchingOrders, setIsFetchingOrders] = useState(true);

	function handleSetOrders(orders: IOrder[]) {
		setOrders(orders);
	}

	const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
	const [isFetchingDeliveries, setIsFetchingDeliveries] = useState(true);

	function handleSetDeliveries(deliveries: IDelivery[]) {
		setDeliveries(deliveries);
	}

	useEffect(() => {
		api
			.get('/order')
			.then((response) => setOrders(response.data))
			.finally(() => setIsFetchingOrders(false));

		api
			.get('/delivery')
			.then((response) => setDeliveries(response.data))
			.finally(() => setIsFetchingDeliveries(false));
	}, []);

	useEffect(() => {
		const socket = socketIo('http://localhost:3003', {
			transports: ['websocket'],
		});

		socket.on('order@new', (order) => {
			setOrders((prev) => [...prev, order]);
		});
	}, []);

	return (
		<OrderContext.Provider
			value={{
				orders,
				deliveries,
				isFetchingOrders,
				isFetchingDeliveries,
				handleSetOrders,
				handleSetDeliveries,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
}

export default OrderProvider;
