
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../Interfaces/IOrder'; 
import { ICustomer } from '../Interfaces/ICustomer';  
import { IProduct } from '../Interfaces/IProduct';
import { CustomerAdmin } from './CustomersAdmin'; 
import { OrdersAdmin } from './OrdersAdmin';
import { ProductsAdmin } from './ProductsAdmin';
import { EditProductModal } from '../Modals/EditProduct';
import { AddProductModal } from '../Modals/AddProduct';
import { OrderDetailsModal } from '../Modals/OrderDetails';

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));

      axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories(response.data);
        console.log('Categories:', response.data);
      })
      .catch(error => console.error('Error fetching categories', error));

      axios.get('http://localhost:3000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));

      axios.get('http://localhost:3000/customers')
      .then(response => setCustomers(response.data))
      
      .catch(error => console.error('Error fetching customers', error));
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      const endpoint = selectedCategory ? `/products/by-category/${encodeURIComponent(selectedCategory)}` : '/products';
      try {
        const response = await axios.get(`http://localhost:3000${endpoint}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
  
    fetchProducts();
  }, [selectedCategory]);
  

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const addProduct = async (product: IProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/addproduct', product);
      setProducts([...products, response.data]);
      closeAddProductModal();  
      console.log('Product added', response.data);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };
  

    const editProduct = (product: IProduct) => {
        setSelectedProduct(product);
    };

    const saveProduct = async (product: IProduct) => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${product._id}`, product);
            setProducts(products.map(p => p._id === product._id ? {...p, ...product} : p));
            setSelectedProduct(null);
            console.log('Product updated', response.data);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const closeEditModal = () => {
        setSelectedProduct(null);
    };


   const deleteProduct = async (id: string) => {
  if(window.confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      console.log('Product deleted', response.data);
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }
}; /* TODO fix bug on not deleting if properites are missing in object */


const viewOrderDetails = async (id: string) => {
  console.log("Called viewOrderDetails with ID:", id);
  try {
    const response = await axios.get(`http://localhost:3000/orders/${id}`);
    const data = await response.data;
    console.log("Data received from server:", data);
    if (!data) {
      console.error('No order details found');
      setSelectedOrder(null); 
    } else {
      setSelectedOrder(data);
      console.log("selectedOrder state set to:", data); 
      console.log(data);
    }
  } catch (error) {
    console.error('Failed to fetch order details', error);
    setSelectedOrder(null);
  }
};



   const viewCustomerProfile = (customerId: string) => {
    
    navigate(`/customers/${customerId}`);
  }; 

  return (
    <div className="container mt-20 mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
        <OrdersAdmin orders={orders} onViewDetails={viewOrderDetails}/>
        {selectedOrder && (
    <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
)}

        <h2 className="text-2xl font-semibold leading-tight">Customers</h2>
        <CustomerAdmin customers={customers} onViewProfile={viewCustomerProfile} />
        <h2 className="text-2xl font-semibold leading-tight">Products</h2>
        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onSave={saveProduct}
            onClose={closeEditModal}
            categories={categories}  
            
          />
        )}
        {showAddProductModal && (
          <AddProductModal
            onSave={addProduct}
            onClose={closeAddProductModal}
            categories={categories}
          />
        )}
        <ProductsAdmin products={products} 
          onEdit={editProduct} 
          onDelete={deleteProduct} 
          onAdd={openAddProductModal} 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}/>
      </div>
    </div>
  );
};


export default Admin;
