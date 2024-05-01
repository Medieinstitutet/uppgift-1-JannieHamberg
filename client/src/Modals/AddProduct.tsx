import React, { useState } from 'react';
import { IProduct } from '../Interfaces/IProduct';

interface AddProductModalProps {
  onSave: (product: IProduct) => void;
  onClose: () => void;
  categories: any[]; 
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onSave, onClose, categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [amountInStock, setAmountInStock] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: IProduct = {
      _id: '',
      name,
      price: Number(price),
      description,
      status,
      amountInStock: Number(amountInStock),
      image,
      category: categoryId ? { _id: categoryId } : undefined  
    };
    onSave(product);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 w-full max-w-md h-auto">
        <div className="rounded shadow-lg bg-white p-5">
          <h2 className="text-lg font-semibold">Add New Product</h2>
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
