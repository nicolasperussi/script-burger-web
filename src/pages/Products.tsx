import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cart from '../components/Cart';
import Product from '../components/Product';
import ProductModal from '../components/ProductModal';
import { ProductContext } from '../context/ProductContext';
import { IProduct } from '../types/IProduct';

function Products() {
	const { products, isFetching } = useContext(ProductContext);
	const params = useParams();

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

	return (
		<div className="h-full">
			<Cart />
			<h1 className="text-3xl mb-10 font-bold">Produtos</h1>
			<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-y-auto">
				{!isFetching &&
					products
						?.filter((product) => product.category.name === params.category)
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
