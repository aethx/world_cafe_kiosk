// src/components/Customer/ProductCard.jsx
import React from 'react';

export default function ProductCard({ item, onAddToCart }) {
  return (
    <div className="bg-white border shadow rounded overflow-hidden flex flex-col">
      <div className="h-32 bg-gray-200 relative">
        <img src={item.imagePath} alt={item.name} className="w-full h-full object-cover" />
        {item.discount > 0 && (
          <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1">
            Discount
          </span>
        )}
      </div>
      <div className="p-2 flex-grow">
        <div className="font-semibold text-lg">{item.name}</div>
        <div className="text-sm text-gray-600 mb-1">{item.category}</div>
        <div>
          {item.discount > 0 ? (
            <div>
              <span className="line-through text-red-500 mr-2">${item.price}</span>
              <span className="font-bold text-blue-600">${(item.price - item.discount).toFixed(2)}</span>
            </div>
          ) : (
            <div className="font-bold text-blue-600">${item.price}</div>
          )}
        </div>
      </div>
      <button onClick={() => onAddToCart(item)} className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
