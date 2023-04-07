import { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IProduct } from '../types/IProduct';
import { BRL } from '../services/utils';

import { IoAdd, IoRemove } from 'react-icons/io5';
import { CartContext } from '../context/CartContext';
import Button from './subcomponents/button.components';

type ProductModalProps = {
	product: IProduct;
	handleToggleOverlay: (state: boolean) => void;
	showOverlay: boolean;
};

function ProductModal({
	product,
	handleToggleOverlay,
	showOverlay,
}: ProductModalProps) {
	const [quantity, setQuantity] = useState(1);

	function handleIncreaseQuantity() {
		setQuantity((prev) => prev + 1);
	}
	function handleDecreaseQuantity() {
		setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
	}
	function handleResetQuantity() {
		setQuantity(1);
	}

	const { addToCart } = useContext(CartContext);

	return (
		<Transition.Root show={showOverlay} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => {
					handleToggleOverlay(false);
					handleResetQuantity();
				}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto">
					<div className="flex p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-screen-md">
								<div className="flex flex-col bg-white min-w-[768px] shadow-xl">
									<img
										className="h-[400px] w-full object-cover"
										src={`http://localhost:3003/images/${product.slug}.jpg`}
										alt=""
									/>
									<div className="flex-1 flex flex-col gap-5 p-6">
										<div className="flex flex-col gap-2">
											<h1 className="text-2xl font-semibold">{product.name}</h1>
											<p className="text-neutral-500">{product.overview}</p>
										</div>

										<p className="text-lg text-neutral-700 just">
											{product.description}
										</p>
									</div>
									<div className="flex flex-col gap-10 basis-40 p-6">
										<div className="flex flex-row w-full items-center">
											<h1 className="flex-1 text-3xl font-semibold">
												{BRL(product.price)}
											</h1>
											<div className="basis-[300px] border border-neutral-200 rounded-xl flex flex-row text-2xl">
												<span
													className="rounded-l-xl hover:bg-neutral-200 flex-1 cursor-pointer select-none flex items-center justify-center py-3"
													onClick={handleDecreaseQuantity}
												>
													<IoRemove />
												</span>
												<span className="flex-1 flex items-center justify-center py-3 border-x border-neutral-200">
													{quantity}
												</span>
												<span
													className="rounded-r-xl hover:bg-neutral-200 flex-1 cursor-pointer select-none flex items-center justify-center py-3"
													onClick={handleIncreaseQuantity}
												>
													<IoAdd />
												</span>
											</div>
										</div>

										<Button
											onClick={() => {
												addToCart({ product, quantity });
												handleToggleOverlay(false);
												handleResetQuantity();
											}}
											variant="fill_orange"
											size="xl"
											title="Adicionar ao carrinho"
										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ProductModal;
