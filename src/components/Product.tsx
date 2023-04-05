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
			className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl cursor-pointer select-none"
			onClick={() => {
				handleViewProduct(product);
				handleToggleOverlay(true);
			}}
		>
			<img
				className="w-full h-[150px] object-cover rounded-xl"
				src={`http://localhost:3003/images/${product.slug}.jpg`}
				alt=""
			/>
			<p className="text-center">{product.name}</p>
			<p>{BRL(product.price)}</p>
		</div>
	);
}

export default Product;
