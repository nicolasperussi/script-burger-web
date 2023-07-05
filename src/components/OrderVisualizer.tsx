import React, { useContext, useState } from "react";
import { BRL } from "../services/utils";
import { IOrder } from "../types/IOrder";
import Button from "./subcomponents/button.components";
import ConfirmationModal from "./ConfirmationModal";
import { api } from "../services/api";
import { OrderContext } from "../context/OrdersContext";
import { toast } from "react-toastify";

type OrderVisualizerProps = {
  order?: IOrder | null;
  handleResetVisualizer: () => void;
};
type OrderType = "DINE_IN" | "DELIVERY";
type OrderStatus = "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DONE";
function getNextStatus(status: OrderStatus, type: OrderType) {
  if (status === "WAITING") return "IN_PRODUCTION";
  if (status === "IN_PRODUCTION" && type === "DELIVERY") return "IN_TRANSIT";
  return "DONE";
}

function OrderVisualizer({
  order,
  handleResetVisualizer,
}: OrderVisualizerProps) {
  const { orders, handleSetOrders } = useContext(OrderContext);

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
    <div className="flex flex-col bg-background-secondary rounded-3xl p-5 basis-[400px] h-full gap-5">
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={order!.status === "DONE" ? "Apagar pedido" : "Cancelar pedido"}
        message={`Deseja mesmo ${
          order!.status === "DONE" ? "apagar" : "cancelar"
        } o pedido #${order!.id
          .split("-")[0]
          .toUpperCase()}? Esta ação é irreversível.`}
        cancelTitle="Voltar"
        confirmTitle={order!.status === "DONE" ? "Apagar" : "Cancelar"}
        icon="alert"
        confirmFunction={() => {
          api.delete(`/order/${order!.id}`);
          const newOrders = orders!.filter(
            (orderObj) => orderObj.id !== order!.id
          );
          handleSetOrders(newOrders);
          toast.success(
            `Pedido #${order!.id.split("-")[0].toUpperCase()} apagado!`,
            {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          handleResetVisualizer();
          handleToggleDeleteModal(false);
        }}
        handleToggleModal={handleToggleDeleteModal}
      />
      <ConfirmationModal
        isOpen={showNextStepModal}
        title="Próximo passo"
        message={`Deseja mudar o status do pedido #${order!.id
          .split("-")[0]
          .toUpperCase()} para ${
          order!.status === "WAITING" ? '"Em produção"' : '"Finalizado"'
        }?`}
        cancelTitle="Voltar"
        confirmTitle="Próximo passo"
        icon="warning"
        confirmFunction={() => {
          api
            .patch(`/order/${order!.id}`, {
              status: getNextStatus(order!.status, order!.type),
            })
            .then(() => {
              {
                handleSetOrders(
                  orders!.map((orderObj) =>
                    orderObj.id === order!.id
                      ? {
                          ...orderObj,
                          status: getNextStatus(order!.status, order!.type),
                        }
                      : orderObj
                  )
                );
              }
            });
          handleResetVisualizer();
          handleToggleNextStepModal(false);
        }}
        handleToggleModal={handleToggleNextStepModal}
      />
      <header className="flex flex-row justify-between gap-5">
        <div className="">
          <p className="text-sm text-text-secondary">ID do pedido</p>
          <p className="text-lg font-semibold text-text-primary">
            #{order!.id.split("-")[0].toUpperCase()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Cliente</p>
          <p className="text-lg font-semibold text-text-primary">
            {order!.client}
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {order?.productList
          .sort((a, b) => (a.product.price! > b.product.price! ? -1 : 1))
          .map((product) => (
            <div className="py-5 border-b border-b-background-primary flex flex-row gap-3">
              <img
                className="w-[75px] h-[75px] object-cover rounded-lg"
                src={`http://localhost:3003/images/${product.product.slug}.jpg`}
                alt=""
              />
              <div className="flex flex-col flex-1 gap-3">
                <h1 className="text-lg font-semibold text-text-primary">
                  {product.product.name}
                </h1>
                <div className="flex justify-between">
                  <div className="flex gap-10 items-center text-text-primary">
                    <p className="">{BRL(product.product.price!)}</p>
                    <p className="text-text-secondary">x {product.quantity}</p>
                  </div>
                  <p className="text-lg font-semibold text-text-primary">
                    {BRL(product.product.price! * product.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <footer className="flex flex-col gap-5">
        <div className="text-xl flex flex-row justify-between">
          <h1 className="text-text-secondary">Total</h1>
          <h1 className="font-semibold text-text-primary">
            {BRL(order?.totalPrice!)}
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          {!(order!.status === "DONE") && (
            <Button
              title="Próximo passo"
              variant="fill_orange"
              onClick={() => handleToggleNextStepModal(true)}
              size="xl"
            />
          )}
          <Button
            title={
              order!.status === "DONE" ? "Apagar pedido" : "Cancelar pedido"
            }
            variant={order!.status === "DONE" ? "fill_red" : "text_red"}
            onClick={() => handleToggleDeleteModal(true)}
            size="xl"
          />
        </div>
      </footer>
    </div>
  );
}

export default OrderVisualizer;
