import React, { useState } from 'react';
import { IProduct } from '../Interfaces/IProduct';

interface EditProductModalProps {
  product: IProduct;
  onSave: (product: IProduct) => void;
  onClose: () => void;
  categories: any[];
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose, categories }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [status, setStatus] = useState(product.status);
  const [amountInStock, setAmountInStock] = useState(product.amountInStock.toString());
  const [image, setImage] = useState(product.image);
  const [categoryId, setCategoryId] = useState(product.category ? product.category._id : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct: IProduct = {
      ...product,
      name,
      price: Number(price),
      description,
      status,
      amountInStock: Number(amountInStock),
      image,
      category: categoryId ? { _id: categoryId } : undefined,
    };
    onSave(updatedProduct);
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 w-full max-w-md h-auto">
        <div className="rounded shadow-lg bg-white p-5">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <input type="number" value={amountInStock} onChange={(e) => setAmountInStock(e.target.value)} placeholder="Amount in Stock" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <div className="flex justify-between space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
