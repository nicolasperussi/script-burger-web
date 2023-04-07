import React from 'react';
import { BRL } from '../services/utils';
import { IProduct } from '../types/IProduct';

type ProductProps = {
	product: IProduct;
	handleViewProduct: (product: IProduct) => void;
	handleToggleOverlay: (state: boolean) => void;
};

function Product({
	product,
	handleViewProduct,
	handleToggleOverlay,
}: ProductProps) {
	return (
		<div
			className="flex flex-col gap-2 cursor-pointer select-none"
			onClick={() => {
				handleViewProduct(product);
				handleToggleOverlay(true);
			}}
		>
			<img
				className="w-full h-[250px] object-cover"
				src={`http://localhost:3003/images/${product.slug}.jpg`}
				alt=""
			/>
			<p className="text-lg text-neutral-700">{product.name}</p>
			<p className="text-2xl font-medium">{BRL(product.price)}</p>
		</div>
	);
}

export default Product;
