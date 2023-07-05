import React from "react";
import { BRL } from "../services/utils";
import { IProduct } from "../types/IProduct";
import { motion } from "framer-motion";

type ProductProps = {
  product: IProduct;
  handleViewProduct: (product: IProduct) => void;
  handleToggleOverlay: (state: boolean) => void;
};

function Product({
  product,
  handleViewProduct,
  handleToggleOverlay,
}: ProductProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 cursor-pointer select-none"
      onClick={() => {
        handleViewProduct(product);
        handleToggleOverlay(true);
      }}
    >
      <img
        className="w-full h-[250px] object-cover"
        src={`http://localhost:3003/images/${product.slug}.jpg`}
        alt=""
      />
      <p className="text-lg text-text-secondary">{product.name}</p>
      <p className="text-2xl font-medium text-text-primary">
        {BRL(product.price)}
      </p>
    </motion.div>
  );
}

export default Product;
