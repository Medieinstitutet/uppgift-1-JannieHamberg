
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../Interfaces/IOrder'; 
import { ICustomer } from '../Interfaces/ICustomer';  
import { IProduct } from '../Interfaces/IProduct';
import { CustomerAdmin } from './CustomersAdmin'; 
import { OrdersAdmin } from './OrdersAdmin';
import { ProductsAdmin } from './ProductsAdmin';

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);

  useEffect(() => {

    axios.get('http://localhost:3000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));
  }, []);

  useEffect(() => {
  
    axios.get('http://localhost:3000/customers')
      .then(response => setCustomers(response.data))
      
      .catch(error => console.error('Error fetching customers', error));
  }, []); 

  
  const editProduct = (product: IProduct) => {
    return product;
  };

  const deleteProduct = (_Id: string) => {
    return _Id;
  };


     const viewOrderDetails = (_Id: string) => {

    navigate(`/orders/${_Id}`);
  }; 


   const viewCustomerProfile = (customerId: string) => {
    
    navigate(`/customers/${customerId}`);
  }; 

  return (
    <div className="container mt-20 mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
         <OrdersAdmin orders={orders} onViewDetails={viewOrderDetails} /> 
        <h2 className="text-2xl font-semibold leading-tight">Customers</h2>
         <CustomerAdmin customers={customers} onViewProfile={viewCustomerProfile} />
         <h2 className="text-2xl font-semibold leading-tight">Products</h2>
        <ProductsAdmin products={products} onEdit={editProduct} onDelete={deleteProduct} />
      </div>
    </div>
  );
};

export default Admin;
