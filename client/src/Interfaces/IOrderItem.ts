
export interface IOrderItem {
    _id: string;
    productId: string;  
    amount: number;
    total: number;
    order: string; 
    productDetails: {
        name: string;
        price: number;
        description?: string;
        image?: string;
        amountInStock?: number;
        status?: string;
        categoryName?: string; 
    };
}

