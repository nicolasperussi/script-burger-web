export interface IDelivery {
	id: string;
	status: 'WAITING' | 'IN_PRODUCTION' | 'IN_TRANSIT' | 'DELIVERED';
	createdAt: string;
	totalPrice: number;
	userId: string;
	addressId: string;
	productList: {
		product: {
			id: string;
			name?: string;
			slug?: string;
			price?: number;
		};
		quantity: number;
	}[];
	address: {
		id: string;
		cep: string;
		street: string;
		number: string;
	};
	user: {
		id: string;
		name: string;
		email: string;
	};
}
