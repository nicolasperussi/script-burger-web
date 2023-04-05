import React from 'react';

import Burgers from '../assets/burgers.jpg';
import Sides from '../assets/sides.webp';
import Drinks from '../assets/drinks.jpg';
import Desserts from '../assets/desserts.webp';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

function Categories() {
	return (
		<div className="flex flex-col gap-10 h-full">
			<h1 className="text-3xl mb-5 font-bold">Categorias</h1>
			<Cart />
			<div className="flex justify-center flex-1 flex-col overflow-y-auto">
				<div className="grid gap-5 grid-cols-2 grid-rows-2">
					<Category path="sandwich" name="Sanduíches" image={Burgers} />
					<Category path="side" name="Acompanhamentos" image={Sides} />
					<Category path="drink" name="Bebidas" image={Drinks} />
					<Category path="dessert" name="Sobremesas" image={Desserts} />
				</div>
			</div>
		</div>
	);
}

type CategoryProps = {
	name: string;
	image: string;
	path: string;
};

function Category({ name, image, path }: CategoryProps) {
	return (
		<Link
			to={path}
			className="flex flex-col items-center justify-center gap-5 flex-1 bg-white rounded-3xl"
		>
			<img
				className="w-full h-[300px] object-cover rounded-3xl"
				src={image}
				alt=""
			/>
			<h1 className="text-3xl font-semibold">{name}</h1>
		</Link>
	);
}

export default Categories;
