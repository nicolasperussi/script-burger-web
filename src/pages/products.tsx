import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/types/product.interface";
import { Plus } from "lucide-react";

function Products() {
  const { data: products } = useFetch<Array<IProduct>>("/products");

  return (
    <div>
      <Tabs defaultValue="sandwiches">
        <div className="flex items-center mb-6">
          <TabsList>
            <TabsTrigger value="sandwiches">Sanduíches</TabsTrigger>
            <TabsTrigger value="side">Acompanhamentos</TabsTrigger>
            <TabsTrigger value="drinks">Bebidas</TabsTrigger>
            <TabsTrigger value="desserts">Sobremesas</TabsTrigger>
          </TabsList>

          {/* TODO: add a dialog to create new product */}
          <Button className="ml-auto flex gap-2">
            <Plus className="size-4" />
            <span>Novo Produto</span>
          </Button>
        </div>
        {products ? (
          <>
            <TabsContent value="sandwiches">
              <ProductList
                products={products.filter(
                  (product: IProduct) => product.category === "SANDWICH"
                )}
              />
            </TabsContent>
            <TabsContent value="side">
              <ProductList
                products={products.filter(
                  (product: IProduct) => product.category === "SIDE"
                )}
              />
            </TabsContent>
            <TabsContent value="drinks">
              <ProductList
                products={products.filter(
                  (product: IProduct) => product.category === "DRINK"
                )}
              />
            </TabsContent>
            <TabsContent value="desserts">
              <ProductList
                products={products.filter(
                  (product: IProduct) => product.category === "DESSERT"
                )}
              />
            </TabsContent>
          </>
        ) : null}
      </Tabs>
    </div>
  );
}

export default Products;
