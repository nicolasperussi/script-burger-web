import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import { IProduct } from "../types/IProduct";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartProviderProps = {
  children: ReactNode;
};

type ProductCartType = {
  product: IProduct;
  quantity: number;
};

type CartContextType = {
  products: ProductCartType[];
  clientName: string;
  setClientName: (name: string) => void;
  addToCart: (product: ProductCartType) => void;
  removeFromCart: (productToRemove: ProductCartType) => void;
  clear: () => void;
  placeOrder: () => void;
};

export const CartContext = createContext<CartContextType>({
  products: [
    {
      product: {
        id: "placeholder-id",
        name: "placeholder-name",
        category: {
          id: "placeholder-category-id",
          name: "placeholder-category-name",
        },
        description: "placeholder-description",
        overview: "placeholder-overview",
        price: 29.9,
        slug: "placeholder-slug",
      },
      quantity: 1,
    },
  ],
  clientName: "",
  setClientName: (name: string) => {},
  addToCart: (product: ProductCartType) => {},
  removeFromCart: (productToRemove: ProductCartType) => {},
  clear: () => {},
  placeOrder: () => {},
});

function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<ProductCartType[]>([]);
  const [clientName, setClientName] = useState<string>("");

  function addToCart(product: ProductCartType) {
    if (
      products.find((p: ProductCartType) => p.product.id === product.product.id)
    ) {
      const index = products.findIndex(
        (p) => p.product.id === product.product.id
      );
      const updatedProducts = [...products];
      updatedProducts[index].quantity += product.quantity;
      return setProducts(updatedProducts);
    }
    return setProducts((prev) => [...prev, product]);
  }

  function removeFromCart(productToRemove: ProductCartType) {
    const index = products.findIndex(
      (p) => p.product.id === productToRemove.product.id
    );
    let updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
    } else {
      updatedProducts = updatedProducts.filter(
        (p) => p.product.id !== productToRemove.product.id
      );
    }
    setProducts(updatedProducts);
  }

  function clear() {
    setProducts([]);
  }

  function placeOrder() {
    api
      .post("/order", {
        client: clientName,
        totalPrice: products
          .map((product) => product.product.price * product.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        productList: products,
        type: "DINE_IN",
      })
      .then(() => {
        toast.success("Pedido criado com sucesso!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clear();
        setClientName("");
      });
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        clear,
        clientName,
        setClientName,
        placeOrder,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
}

export default CartProvider;
