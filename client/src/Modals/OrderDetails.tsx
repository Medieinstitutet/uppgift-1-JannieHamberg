import React from 'react';
import { IOrder } from '../Interfaces/IOrder';

interface OrderDetailsModalProps {
  order: IOrder;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="relative p-5 w-full max-w-md h-auto">
        <div className="rounded shadow-lg bg-white p-5">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <ul>
          <li><strong>Order ID:</strong> {order._id}</li>
          <li><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</li>
          <li><strong>Status:</strong> {order.status}</li>
          <li><strong>Total Price:</strong> {order.total}</li>
          <li><strong>Customer:</strong> {order.customer}</li>
          <p className='mb-3 font-bold'>Products:</p>
          <li>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                 {item.productDetails?.name || 'No product name'}  <br /> <strong>Quantity:</strong> {item.amount}
                    <br />
                    <strong>Price per item:</strong> {item.productDetails?.price || 'Price unavailable'}
                  <div className="border-dashed border-black mb-4"></div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
            <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Close</button>
        </div>
    </div>
</div>
  );
};
