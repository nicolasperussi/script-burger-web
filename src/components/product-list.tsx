import { BRL } from "@/lib/utils";
import { IProduct } from "@/types/product.interface";

interface ProductListProps {
  products: Array<IProduct>;
}

function ProductList(props: ProductListProps) {
  return (
    <div className="flex flex-wrap gap-8">
      {props.products.map((product: IProduct) => {
        return (
          <div
            key={product.id}
            className="cursor-pointer flex w-48 flex-col gap-4 hover:scale-105 transition-transform duration-150"
          >
            <img
              className="size-48 rounded-lg object-cover"
              src={`http://localhost:3003/images/${product.slug}.jpg`}
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="text-sm text-foreground/80">{product.name}</h1>
              <h2 className="font-semibold">{BRL(product.price)}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
