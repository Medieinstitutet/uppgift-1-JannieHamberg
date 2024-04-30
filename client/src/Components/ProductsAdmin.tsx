
import React from 'react';
import { IProduct } from '../Interfaces/IProduct';

interface IProductsAdmin {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
}

export const ProductsAdmin: React.FC<IProductsAdmin>= ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            {/* Other headers */}
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {product.name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {product.price}
              </td>
              {/* Other columns */}
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button
                  onClick={() => onEdit(product)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


