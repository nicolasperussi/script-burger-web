import React, { createContext, ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';
import { IProduct } from '../types/IProduct';

type ProductContextType = {
	products: IProduct[] | null | undefined;
	isFetching: boolean;
};

type ProductProviderProps = {
	children: ReactNode;
};

export const ProductContext = createContext<ProductContextType>({
	products: [],
	isFetching: true,
});

function ProductProvider({ children }: ProductProviderProps) {
	const { data, isFetching } = useFetch<IProduct[]>('/product');

	return (
		<ProductContext.Provider value={{ products: data, isFetching }}>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductProvider;
