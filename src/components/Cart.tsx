import React, { useContext, useState } from "react";
import { IoCart } from "react-icons/io5";
import { CartContext } from "../context/CartContext";
import CartOverlay from "./CartOverlay";

function Cart() {
  const [showOverlay, setShowOverlay] = useState(false);

  function handleToggleOverlay(state: boolean) {
    setShowOverlay(state);
  }

  const { products } = useContext(CartContext);

  return (
    <>
      <div
        className="absolute right-8 top-8 p-6 flex items-center justify-center rounded-full text-2xl text-orange-500 bg-background-secondary cursor-pointer shadow-lg hover:scale-110 transition-all ease-in-out"
        onClick={() => handleToggleOverlay(true)}
      >
        <IoCart />
        {products.length > 0 && (
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-background-secondary rounded-full top-0 right-0">
            {products.length}
          </div>
        )}
      </div>
      <CartOverlay
        showOverlay={showOverlay}
        handleToggleOverlay={handleToggleOverlay}
      />
    </>
  );
}

export default Cart;
