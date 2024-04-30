import React, { useState } from 'react';
import { IProduct } from '../Interfaces/IProduct';


interface EditProductModalProps {
    product: IProduct;
    onSave: (product: IProduct) => void;
    onClose: () => void;
  }

  export const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState<IProduct>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = (name === 'price' || name === 'amountInStock') ? parseInt(value, 10) : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="edit-modal">
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={formData.price.toString()} onChange={handleChange} />
                </label>
                <label>Description:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>Image:
                    <input type="text" name="image" value={formData.image.toString()} onChange={handleChange} />
                </label>
                <label>Amount In Stock:
                    <input type="number" name="amountInStock" value={formData.amountInStock.toString()} onChange={handleChange} />
                </label>
                <label>Status:
                    <input type="text" name="status" value={formData.status} onChange={handleChange} />
                </label>
                <label>Category:
                    <input type="text" name="category" value={formData.category._id} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};
