// src/components/Admin/AdminItemCard.jsx
import React, { useState, useRef } from 'react';

export default function AdminItemCard({ item, onUpdate, onDelete, categories }) {
  const [editName, setEditName] = useState(item.name);
  const [editCategory, setEditCategory] = useState(item.category);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [editPrice, setEditPrice] = useState(item.price);
  const [editDiscount, setEditDiscount] = useState(item.discount);
  const [isSpecial, setIsSpecial] = useState(item.isSpecial);
  const [disabled, setDisabled] = useState(item.disabled);

  const fileRef = useRef(null);

  const handleImageClick = () => {
    fileRef.current && fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImagePath = URL.createObjectURL(file);
      onUpdate({ ...item, imagePath: newImagePath });
    }
  };

  const handleAutoSave = (additionalFields = {}) => {
    const discountVal = parseFloat(editDiscount) || 0;
    const priceVal = parseFloat(editPrice) || 0;
    const clampedDiscount = Math.min(discountVal, priceVal);
    onUpdate({
      ...item,
      name: editName,
      category: editCategory,
      price: priceVal,
      discount: clampedDiscount,
      isSpecial,
      disabled,
      ...additionalFields,
    });
  };

  const renderCategoryField = () => {
    if (categories.length > 0 && !isCreatingCategory) {
      return (
        <select
          className="border-b w-full focus:outline-none"
          value={editCategory}
          onChange={(e) => {
            if (e.target.value === 'CREATE_NEW') {
              setIsCreatingCategory(true);
              setEditCategory('');
            } else {
              setEditCategory(e.target.value);
            }
          }}
          onBlur={handleAutoSave}
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
          <option value="CREATE_NEW">Create New</option>
        </select>
      );
    } else {
      return (
        <input
          type="text"
          className="border-b w-full focus:outline-none"
          placeholder="Category"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          onBlur={() => {
            setIsCreatingCategory(false);
            handleAutoSave();
          }}
        />
      );
    }
  };

  const renderIcon = (label, type) => (
    <span className={`inline-flex justify-center items-center w-5 h-5 text-xs font-bold text-white rounded-full mr-1 ${type}`}>{label}</span>
  );

  return (
    <div className="bg-white border shadow rounded overflow-hidden flex flex-col">
      <div className="h-32 bg-gray-200 relative">
        <img
          src={item.imagePath}
          alt={item.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleImageClick}
        />
        <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleFileChange} />
      </div>
      <div className="p-2 flex-grow space-y-1 text-sm">
        <div className="flex items-center">
          {renderIcon('I', 'bg-blue-500')}
          <input
            type="text"
            className="font-semibold w-full border-b focus:outline-none"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleAutoSave}
          />
        </div>
        <div className="flex items-center">
          {renderIcon('C', 'bg-purple-600')}
          {renderCategoryField()}
        </div>
        <div className="flex items-center">
          {renderIcon('P', 'bg-orange-500')}
          <input
            type="number"
            className="w-full border-b focus:outline-none"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            onBlur={handleAutoSave}
          />
        </div>
        <div className="flex items-center">
          {renderIcon('D', 'bg-green-600')}
          <input
            type="number"
            className="w-full border-b focus:outline-none"
            value={editDiscount}
            onChange={(e) => setEditDiscount(e.target.value)}
            onBlur={handleAutoSave}
          />
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isSpecial}
              onChange={(e) => {
                setIsSpecial(e.target.checked);
                handleAutoSave({ isSpecial: e.target.checked });
              }}
            />
            <span className="ml-1">Special</span>
          </label>
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => {
                setDisabled(e.target.checked);
                handleAutoSave({ disabled: e.target.checked });
              }}
            />
            <span className="ml-1">Disabled</span>
          </label>
        </div>
      </div>
      <button onClick={() => onDelete(item.id)} className="w-full py-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
        Delete
      </button>
    </div>
  );
}
