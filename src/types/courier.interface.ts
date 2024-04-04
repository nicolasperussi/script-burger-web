import { IOrder } from "./order.interface";

export interface ICourier {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  licensePlate: string;
  orders?: Array<IOrder>;
}
