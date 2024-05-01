export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  amountInStock: number;
  status: string;
  category?: {
    _id: string;
    name?: string;
  };
}
