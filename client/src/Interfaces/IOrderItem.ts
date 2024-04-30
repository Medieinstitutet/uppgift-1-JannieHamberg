import { IOrder } from "./IOrder";

export interface IOrderItem {
    _id: string;
    productId: string;
    amount: number;
    totalPrice: number; 
    order: IOrder["_id"];

  }
  