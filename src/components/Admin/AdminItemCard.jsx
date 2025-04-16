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

  const [showNameHelp, setShowNameHelp] = useState(false);
  const [showCategoryHelp, setShowCategoryHelp] = useState(false);
  const [showPriceHelp, setShowPriceHelp] = useState(false);
  const [showDiscountHelp, setShowDiscountHelp] = useState(false);

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
    onUpdate({
      ...item,
      name: editName,
      category: editCategory,
      price: parseFloat(editPrice) || 0,
      discount: parseFloat(editDiscount) || 0,
      isSpecial,
      disabled,
      ...additionalFields,
    });
  };

  const renderCategoryField = () => {
    if (categories.length > 0 && !isCreatingCategory) {
      return (
        <div className="relative flex items-center">
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
          <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showCategoryHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Item Category
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="relative flex items-center">
          <input
            type="text"
            className="border-b w-full focus:outline-none"
            placeholder="Category"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            onBlur={() => { setIsCreatingCategory(false); handleAutoSave(); }}
          />
          <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showCategoryHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Item Category
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="bg-white border shadow rounded overflow-hidden flex flex-col">
      <div className="h-32 bg-gray-200 relative">
        <img
          src={item.imagePath}
          alt={item.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleImageClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="p-2 flex-grow space-y-1">
        {/* Item Name Field */}
        <div className="relative flex items-center">
          <input
            type="text"
            className="font-semibold text-lg w-full border-b focus:outline-none"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleAutoSave}
          />
          <button onClick={() => setShowNameHelp(!showNameHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showNameHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Item Name
            </div>
          )}
        </div>
        {renderCategoryField()}
        {/* Price Field */}
        <div className="relative flex items-center">
          <input
            type="number"
            className="w-full border-b focus:outline-none"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            onBlur={handleAutoSave}
          />
          <button onClick={() => setShowPriceHelp(!showPriceHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showPriceHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Price (in $)
            </div>
          )}
        </div>
        {/* Discount Field */}
        <div className="relative flex items-center">
          <input
            type="number"
            className="w-full border-b focus:outline-none"
            value={editDiscount}
            onChange={(e) => setEditDiscount(e.target.value)}
            onBlur={handleAutoSave}
          />
          <button onClick={() => setShowDiscountHelp(!showDiscountHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showDiscountHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Discount Amount ($)
            </div>
          )}
        </div>
        {/* Special & Disabled toggles */}
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
