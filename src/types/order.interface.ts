import { IClient } from "./client.interface";
import { ICourier } from "./courier.interface";
import { IProduct } from "./product.interface";

export interface IOrder {
  id: number;
  moment: string;
  status: "CANCELED" | "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED";
  client: IClient;
  courier: ICourier;
  items: Array<{
    quantity: number;
    totalPrice: number;
    product: IProduct;
  }>;
  deliveryAddress: {
    cep: string;
    street: string;
    number: string;
  };
  totalPrice: number;
}
