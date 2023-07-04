import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IProduct } from "../types/IProduct";
import { api } from "../services/api";

type ProductContextType = {
  products: IProduct[] | null | undefined;
  isFetching: boolean;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  isFetching: true,
});

function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    api
      .get("/product")
      .then((response) => setProducts(response.data))
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, isFetching }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
