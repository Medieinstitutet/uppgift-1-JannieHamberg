import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    _id: string;
    orderDate: Date;
    status: 'paid' | 'unpaid'; 
    totalPrice: number;
    paymentId?: string; 
    customer: string;
    items: IOrderItem[]; 
  };
  