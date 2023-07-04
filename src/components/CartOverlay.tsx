import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, MinusIcon } from "@heroicons/react/24/outline";
import { BRL } from "../services/utils";
import { CartContext } from "../context/CartContext";
import { IProduct } from "../types/IProduct";
import Button from "./subcomponents/button.components";
import ConfirmationModal from "./ConfirmationModal";
import EmptyCart from "../assets/empty_cart.png";
import { toast } from "react-toastify";

type CartOverlayProps = {
  showOverlay: boolean;
  handleToggleOverlay: (state: boolean) => void;
};

type ProductCartType = {
  product: IProduct;
  quantity: number;
};

function CartOverlay({ showOverlay, handleToggleOverlay }: CartOverlayProps) {
  const { products, clear, removeFromCart } = useContext(CartContext);
  const totalPrice = products
    .map((product) => product.product.price * product.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const [isClientOpen, setIsClientOpen] = useState(false);

  const toggleClientOpen = (state: boolean) => {
    setIsClientOpen(state);
  };
  const closeCart = () => {
    handleToggleOverlay(false);
  };

  // Confirmation
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  function handleToggleModal(state: boolean) {
    setShowConfirmationModal(state);
  }

  return (
    <>
      <GetClientName
        isOpen={isClientOpen}
        toggleModal={toggleClientOpen}
        closeCart={closeCart}
      />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Cancelar pedido"
        message={`Deseja mesmo apagar os produtos deste carrinho? Esta ação é irreversível.`}
        cancelTitle="Voltar"
        confirmTitle="Cancelar"
        icon="alert"
        confirmFunction={() => {
          clear();
          closeCart();
          handleToggleModal(false);
          toast.success("Carrinho limpo!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
        handleToggleModal={handleToggleModal}
      />
      <Transition.Root show={showOverlay} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleToggleOverlay(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[500px]">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white"
                          onClick={() => handleToggleOverlay(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-screen flex-col bg-white py-6 shadow-xl">
                      {products.length < 1 ? (
                        <div className="h-full w-full flex flex-col justify-center items-center">
                          <img src={EmptyCart} alt="" />
                          <h1 className="text-center p-5 text-neutral-500">
                            Adicione produtos ao seu pedido para ve-los aqui!
                          </h1>
                        </div>
                      ) : (
                        <div className="flex flex-col bg-white rounded-3xl p-5 h-full gap-5">
                          <div className="flex-1 overflow-y-auto">
                            {products
                              .sort((a, b) =>
                                a.product.price! > b.product.price! ? -1 : 1
                              )
                              .map((cartProduct: ProductCartType) => (
                                <div className="py-5 border-b border-b-neutral-200 flex flex-row items-center gap-3">
                                  <img
                                    className="w-[75px] h-[75px] object-cover rounded-lg"
                                    src={`http://localhost:3003/images/${cartProduct.product.slug}.jpg`}
                                    alt=""
                                  />
                                  <div className="flex flex-col flex-1 gap-3">
                                    <div className="text-lg font-semibold flex justify-between items-center">
                                      {cartProduct.product.name}
                                      {cartProduct.quantity > 1 ? (
                                        <MinusIcon
                                          onClick={() =>
                                            removeFromCart(cartProduct)
                                          }
                                          className="h-6 w-6 text-red-500 cursor-pointer"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <XMarkIcon
                                          onClick={() =>
                                            removeFromCart(cartProduct)
                                          }
                                          className="h-6 w-6 text-red-500 cursor-pointer"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex gap-10 items-center">
                                        <p className="">
                                          {BRL(cartProduct.product.price)}
                                        </p>
                                        <p className="text-neutral-500">
                                          x {cartProduct.quantity}
                                        </p>
                                      </div>
                                      <p className="text-lg font-semibold">
                                        {BRL(
                                          cartProduct.product.price *
                                            cartProduct.quantity
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <footer className="flex flex-col gap-5">
                            <div className="text-xl flex flex-row justify-between">
                              <h1 className="text-neutral-500">Total</h1>
                              <h1 className="font-semibold">
                                {BRL(totalPrice)}
                              </h1>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Button
                                title="Finalizar pedido"
                                variant="fill_orange"
                                onClick={() => toggleClientOpen(true)}
                                size="xl"
                              />
                              <Button
                                title="Cancelar pedido"
                                variant="text_red"
                                onClick={() => handleToggleModal(true)}
                                size="xl"
                              />
                            </div>
                          </footer>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default CartOverlay;

type GetClientNameProps = {
  isOpen: boolean;
  toggleModal: (state: boolean) => void;
  closeCart: () => void;
};

function GetClientName({ isOpen, toggleModal, closeCart }: GetClientNameProps) {
  const { setClientName, placeOrder } = useContext(CartContext);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-11" onClose={toggleModal}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <label
                    htmlFor="username"
                    className="block  text-lg font-medium leading-6 text-gray-900"
                  >
                    Nome do cliente
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="block flex-1 border bg-transparent p-2 text-gray-900 placeholder:text-gray-400 text-lg"
                        placeholder=""
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 gap-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    title="Finalizar pedido"
                    variant="fill_orange"
                    size="sm"
                    onClick={() => {
                      placeOrder();
                      toggleModal(false);
                      closeCart();
                    }}
                  />
                  <Button
                    title="Cancelar"
                    variant="text_stone"
                    size="sm"
                    onClick={() => toggleModal(false)}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
