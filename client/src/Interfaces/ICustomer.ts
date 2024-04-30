import { IOrder } from "./IOrder";

export interface ICustomer {
    _id: string;
    firstName: string;
    lastName: string;
  /*   email: string; */
   /*  orders: IOrder[];  */
    address: {
        address1: string;
        address2: string;
        zipcode: number;
        city: string;
        country: string;
    }/* ,
    password: string; */
    
  };