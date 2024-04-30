
  export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    amountInStock: number;
    status: string;
    category: {
      _id: string;
      name?: string;
    };
  }
  