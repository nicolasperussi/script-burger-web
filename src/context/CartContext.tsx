import React, { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';
import { IProduct } from '../types/IProduct';

type CartProviderProps = {
	children: ReactNode;
};

type ProductCartType = {
	product: IProduct;
	quantity: number;
};

type CartContextType = {
	products: ProductCartType[];
	clientName: string;
	setClientName: (name: string) => void;
	addToCart: (product: ProductCartType) => void;
	removeFromCart: (productToRemove: ProductCartType) => void;
	clear: () => void;
	placeOrder: () => void;
};

export const CartContext = createContext<CartContextType>({
	products: [
		{
			product: {
				id: 'placeholder-id',
				name: 'placeholder-name',
				category: {
					id: 'placeholder-category-id',
					name: 'placeholder-category-name',
				},
				description: 'placeholder-description',
				overview: 'placeholder-overview',
				price: 29.9,
				slug: 'placeholder-slug',
			},
			quantity: 1,
		},
	],
	clientName: '',
	setClientName: (name: string) => {},
	addToCart: (product: ProductCartType) => {},
	removeFromCart: (productToRemove: ProductCartType) => {},
	clear: () => {},
	placeOrder: () => {},
});

function CartProvider({ children }: CartProviderProps) {
	const [products, setProducts] = useState<ProductCartType[]>([]);
	const [clientName, setClientName] = useState<string>('');

	function addToCart(product: ProductCartType) {
		setProducts((prev) => [...prev, product]);
	}

	function removeFromCart(productToRemove: ProductCartType) {
		setProducts(
			products.filter(
				(product) => product.product.id !== productToRemove.product.id
			)
		);
	}

	function clear() {
		setProducts([]);
	}

	function placeOrder() {
		api
			.post('/order', {
				client: clientName,
				totalPrice: products
					.map((product) => product.product.price * product.quantity)
					.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
				productList: products,
			})
			.then(() => {
				clear();
				setClientName('');
			});
	}

	return (
		<CartContext.Provider
			value={{
				products,
				addToCart,
				removeFromCart,
				clear,
				clientName,
				setClientName,
				placeOrder,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;
