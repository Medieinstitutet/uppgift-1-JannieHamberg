
import React from 'react';
import { IOrder } from '../Interfaces/IOrder';

interface IOrdersAdmin {
  orders: IOrder[];
  onViewDetails: (orderId: string) => void;
}

export const OrdersAdmin: React.FC<IOrdersAdmin> = ({ orders, onViewDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {order._id}
              </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {order.orderDate.toString()}
            </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {order.status}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                ${order.totalPrice}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button
                  onClick={() => onViewDetails(order._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

