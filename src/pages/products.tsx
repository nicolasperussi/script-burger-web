import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { IProduct } from "@/types/product.interface";
import { Loader2, Plus } from "lucide-react";
import { useQuery } from "react-query";

function Products() {
  const { data: products, isFetching } = useQuery("products", async () => {
    const response = await api.get("/products");

    return response.data;
  });

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
        {!isFetching ? (
          products && (
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
          )
        ) : (
          <div className="grid place-items-center w-full h-full">
            <Loader2 className="size-32 animate-spin text-border" />
          </div>
        )}
      </Tabs>
    </div>
  );
}

export default Products;
