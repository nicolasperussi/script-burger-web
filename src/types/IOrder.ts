export interface IOrder {
  id: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  createdAt: Date;
  totalPrice: number;
  client: string;
  productList: {
    product: {
      id: string;
      name?: string;
      slug?: string;
      price?: number;
    };
    quantity: number;
  }[];
}
