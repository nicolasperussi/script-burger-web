import React, { useState, useContext } from 'react';
import Cart from '../components/Cart';
import Product from '../components/Product';
import ProductModal from '../components/ProductModal';
import { ProductContext } from '../context/ProductContext';
import { IProduct } from '../types/IProduct';
import Button from '../components/subcomponents/button.components';

import {motion} from 'framer-motion';

function Products() {
	const { products, isFetching } = useContext(ProductContext);

	const [viewProduct, setViewProduct] = useState<IProduct>({
		id: 'fake',
		name: 'fake-name',
		category: { id: 'fake-id', name: 'sandwich' },
		description: 'fake-description',
		overview: 'fake-overview',
		price: 20.99,
		slug: 'fake-slug',
	});

	const [showOverlay, setShowOverlay] = useState(false);

	function handleToggleOverlay(state: boolean) {
		setShowOverlay(state);
	}

	function handleViewProduct(product: IProduct) {
		setViewProduct(product);
	}

	const [category, setCategory] = useState('sandwich');

	return (
		<div className="h-full">
			<Cart />
			<h1 className="text-3xl mb-5 font-bold">Produtos</h1>
			<div className="mb-5 flex flex-row gap-5">
				<Button
					variant={category === 'sandwich' ? 'fill_orange' : 'text_orange'}
					title="🥪 Sanduiches"
					size="md"
					onClick={() => setCategory('sandwich')}
				/>
				<Button
					variant={category === 'side' ? 'fill_orange' : 'text_orange'}
					title="🍟 Acompanhamentos"
					size="md"
					onClick={() => setCategory('side')}
				/>
				<Button
					variant={category === 'drink' ? 'fill_orange' : 'text_orange'}
					title="🥤 Bebidas"
					size="md"
					onClick={() => setCategory('drink')}
				/>
				<Button
					variant={category === 'dessert' ? 'fill_orange' : 'text_orange'}
					title="🍰 Sobremesas"
					size="md"
					onClick={() => setCategory('dessert')}
				/>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,250px)] gap-10 overflow-y-auto">
				{!isFetching &&
					products
						?.filter((product) => product.category.name === category)
						.map((product) => (
							<Product
								key={product.id}
								product={product}
								handleViewProduct={handleViewProduct}
								handleToggleOverlay={handleToggleOverlay}
							/>
						))}
				<ProductModal
					product={viewProduct}
					showOverlay={showOverlay}
					handleToggleOverlay={handleToggleOverlay}
				/>
			</div>
		</div>
	);
}

export default Products;
