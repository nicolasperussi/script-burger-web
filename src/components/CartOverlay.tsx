import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, MinusIcon } from "@heroicons/react/24/outline";
import { BRL } from "../services/utils";
import { CartContext } from "../context/CartContext";
import { IProduct } from "../types/IProduct";
import ConfirmationModal from "./ConfirmationModal";
import EmptyCart from "../assets/empty_cart.png";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { FillButton, TextButton } from "./subcomponents/button.components";

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
            <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
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
                          className="rounded-md text-text-secondary hover:text-text-primary"
                          onClick={() => handleToggleOverlay(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-screen flex-col bg-background-primary py-6 shadow-xl">
                      {products.length < 1 ? (
                        <div className="h-full w-full flex flex-col justify-center items-center">
                          {/* TODO: change image <img src={EmptyCart} alt="" /> */}
                          <h1 className="text-center p-5 text-text-primary">
                            Adicione produtos ao seu pedido para ve-los aqui!
                          </h1>
                        </div>
                      ) : (
                        <div className="flex flex-col bg-background-primary rounded-3xl p-5 h-full gap-5">
                          <div className="flex-1 overflow-y-auto">
                            <AnimatePresence>
                              {products
                                .sort((a, b) =>
                                  a.product.price! > b.product.price! ? -1 : 1
                                )
                                .map((cartProduct: ProductCartType) => (
                                  <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 50,
                                      mass: 1,
                                    }}
                                    key={cartProduct.product.id}
                                    className="py-5 border-b border-b-text-secondary border-opacity-25 flex flex-row items-center gap-3"
                                  >
                                    <img
                                      className="w-[75px] h-[75px] object-cover rounded-lg"
                                      src={`http://localhost:3003/images/${cartProduct.product.slug}.jpg`}
                                      alt=""
                                    />
                                    <div className="flex flex-col flex-1 gap-3">
                                      <div className="text-lg font-semibold flex justify-between items-center">
                                        <span className="text-text-primary">
                                          {cartProduct.product.name}
                                        </span>
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
                                          <p className="text-text-primary">
                                            {BRL(cartProduct.product.price)}
                                          </p>
                                          <p className="text-text-secondary">
                                            x {cartProduct.quantity}
                                          </p>
                                        </div>
                                        <p className="text-lg font-semibold text-text-primary">
                                          {BRL(
                                            cartProduct.product.price *
                                              cartProduct.quantity
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                            </AnimatePresence>
                          </div>

                          <footer className="flex flex-col gap-5">
                            <div className="text-xl flex flex-row justify-between">
                              <h1 className="text-text-secondary">Total</h1>
                              <h1 className="font-semibold text-text-primary">
                                {BRL(totalPrice)}
                              </h1>
                            </div>
                            <div className="flex flex-col gap-3">
                              <FillButton
                                title="Finalizar pedido"
                                color="orange"
                                onClick={() => toggleClientOpen(true)}
                                size="xl"
                              />
                              <TextButton
                                title="Cancelar pedido"
                                color="red"
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
          <div className="fixed inset-0 bg-background-secondary bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-background-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-background-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium leading-6 text-text-primary"
                  >
                    Nome do cliente
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="block flex-1 border border-text-secondary rounded-md bg-transparent p-2 text-text-primary placeholder:text-text-secondary text-lg"
                        placeholder="Digite o nome do cliente"
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-background-secondary px-4 py-3 gap-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <FillButton
                    title="Finalizar pedido"
                    color="orange"
                    size="sm"
                    onClick={() => {
                      placeOrder();
                      toggleModal(false);
                      closeCart();
                    }}
                  />
                  <TextButton
                    title="Cancelar"
                    color="red"
                    size="sm"
                    onClick={() => {
                      console.log("clicked");
                      toggleModal(false);
                    }}
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
