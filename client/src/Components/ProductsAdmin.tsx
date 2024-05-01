
import React from 'react';
import { IProduct } from '../Interfaces/IProduct';

interface IProductsAdmin {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const ProductsAdmin: React.FC<IProductsAdmin>= ({ products, onEdit, onDelete, categories,
  selectedCategory,
  setSelectedCategory }) => {

    return (
      <div className="flex flex-col w-full"> 
          <div className="flex justify-end mb-4"> 
              <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                      <option key={category._id} value={category.name}>{category.name}</option>
                  ))}
              </select>
          </div>
          <table className="min-w-full leading-normal">
              <thead>
                  <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                      </th>
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
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {product.status}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900">
                                  Edit
                              </button>
                              <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-900">
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


