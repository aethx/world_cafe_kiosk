// src/components/Admin/AddItemModal.jsx
import React, { useState } from 'react';

export default function AddItemModal({ onClose, onAdd, existingCategories }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [file, setFile] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleAdd = () => {
    const newItem = {
      id: Date.now(), // For demo; in production, the DB generates an ID.
      name,
      description: `Description for ${name}`,
      category,
      price: parseFloat(price) || 0,
      discount: parseFloat(discount) || 0,
      imagePath: file ? URL.createObjectURL(file) : '/images/placeholder.jpg',
      isSpecial,
      disabled,
    };
    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Add New Item</h2>
        <div className="space-y-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {existingCategories.length > 0 && !isCreatingCategory ? (
            <select
              className="border p-2 w-full"
              value={category}
              onChange={(e) => {
                if (e.target.value === 'CREATE_NEW') {
                  setIsCreatingCategory(true);
                  setCategory('');
                } else {
                  setCategory(e.target.value);
                }
              }}
            >
              <option value="">Select Category</option>
              {existingCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
              <option value="CREATE_NEW">Create New</option>
            </select>
          ) : (
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          )}
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Discount Amount ($)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
          <div className="flex items-center space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSpecial}
                onChange={(e) => setIsSpecial(e.target.checked)}
              />
              <span className="ml-1">Special</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <span className="ml-1">Disabled</span>
            </label>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
