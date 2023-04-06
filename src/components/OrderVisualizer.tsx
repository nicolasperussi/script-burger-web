import React, { useState } from 'react';
import { BRL } from '../services/utils';
import { IOrder } from '../types/IOrder';
import Button from './subcomponents/button.components';
import ConfirmationModal from './ConfirmationModal';
import { api } from '../services/api';

type OrderVisualizerProps = {
	order?: IOrder | null;
};

function OrderVisualizer({ order }: OrderVisualizerProps) {
	// Delete order confirmation
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	function handleToggleDeleteModal(state: boolean) {
		setShowConfirmationModal(state);
	}

	const [showNextStepModal, setShowNextStepModal] = useState(false);
	function handleToggleNextStepModal(state: boolean) {
		setShowNextStepModal(state);
	}

	return (
		<div className="flex flex-col bg-white rounded-3xl p-5 basis-[400px] h-full gap-5">
			<ConfirmationModal
				isOpen={showConfirmationModal}
				title={order!.status === 'DONE' ? 'Apagar pedido' : 'Cancelar pedido'}
				message={`Deseja mesmo ${
					order!.status === 'DONE' ? 'apagar' : 'cancelar'
				} o pedido #${order!.id
					.split('-')[0]
					.toUpperCase()}? Esta ação é irreversível.`}
				cancelTitle="Voltar"
				confirmTitle={order!.status === 'DONE' ? 'Apagar' : 'Cancelar'}
				icon="alert"
				confirmFunction={() => {
					api
						.delete(`/order/${order!.id}`)
						.then(() => window.location.reload());
					handleToggleDeleteModal(false);
				}}
				handleToggleModal={handleToggleDeleteModal}
			/>
			<ConfirmationModal
				isOpen={showNextStepModal}
				title="Próximo passo"
				message={`Deseja mudar o status do pedido #${order!.id
					.split('-')[0]
					.toUpperCase()} para ${
					order!.status === 'WAITING' ? '"Em produção"' : '"Finalizado"'
				}?`}
				cancelTitle="Voltar"
				confirmTitle="Próximo passo"
				icon="warning"
				confirmFunction={() => {
					api
						.patch(`/order/${order!.id}`, {
							status: order!.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE',
						})
						.then(() => window.location.reload());
					handleToggleNextStepModal(false);
				}}
				handleToggleModal={handleToggleNextStepModal}
			/>
			<header className="flex flex-row justify-between gap-5">
				<div className="">
					<p className="text-sm text-neutral-500">ID do pedido</p>
					<p className="text-lg font-semibold">
						#{order!.id.split('-')[0].toUpperCase()}
					</p>
				</div>
				<div className="text-right">
					<p className="text-sm text-neutral-500">Cliente</p>
					<p className="text-lg font-semibold">{order!.client}</p>
				</div>
			</header>
			<div className="flex-1 overflow-y-auto">
				{order?.productList
					.sort((a, b) => (a.product.price! > b.product.price! ? -1 : 1))
					.map((product) => (
						<div className="py-5 border-b border-b-neutral-100 flex flex-row gap-3">
							<img
								className="w-[75px] h-[75px] object-cover rounded-lg"
								src={`http://localhost:3003/images/${product.product.slug}.jpg`}
								alt=""
							/>
							<div className="flex flex-col flex-1 gap-3">
								<h1 className="text-lg font-semibold">
									{product.product.name}
								</h1>
								<div className="flex justify-between">
									<div className="flex gap-10 items-center">
										<p className="">{BRL(product.product.price!)}</p>
										<p className="text-neutral-500">x {product.quantity}</p>
									</div>
									<p className="text-lg font-semibold">
										{BRL(product.product.price! * product.quantity)}
									</p>
								</div>
							</div>
						</div>
					))}
			</div>

			<footer className="flex flex-col gap-5">
				<div className="text-xl flex flex-row justify-between">
					<h1 className="text-neutral-500">Total</h1>
					<h1 className="font-semibold">{BRL(order?.totalPrice!)}</h1>
				</div>
				<div className="flex flex-col gap-3">
					{!(order!.status === 'DONE') && (
						<Button
							title="Próximo passo"
							variant="fill_orange"
							onClick={() => handleToggleNextStepModal(true)}
							size="xl"
						/>
					)}
					<Button
						title={
							order!.status === 'DONE' ? 'Apagar pedido' : 'Cancelar pedido'
						}
						variant={order!.status === 'DONE' ? 'fill_red' : 'text_red'}
						onClick={() => handleToggleDeleteModal(true)}
						size="xl"
					/>
				</div>
			</footer>
		</div>
	);
}

export default OrderVisualizer;
