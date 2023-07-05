export interface IOrder {
  id: string;
  status: "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DONE";
  createdAt: Date;
  totalPrice: number;
  client: string;
  type: "DINE_IN" | "DELIVERY";
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
