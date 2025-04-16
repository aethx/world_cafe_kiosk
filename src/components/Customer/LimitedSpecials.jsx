// src/components/Customer/LimitedSpecials.jsx
import React from 'react';

export default function LimitedSpecials({ items }) {
  return (
    <div className="p-3 bg-yellow-50 border-t border-yellow-200">
      <h3 className="text-lg font-medium text-yellow-800">Limited Time Specials</h3>
      <div className="flex space-x-4 overflow-x-auto py-2">
        {items.map((it) => {
          // Compute effective price; never below 0.
          const effectivePrice = Math.max(it.price - it.discount, 0).toFixed(2);
          return (
            <div key={`special-${it.id}`} className="flex-shrink-0 w-32 text-center relative">
              <div className="h-20 w-20 bg-white rounded-full mx-auto mb-1 overflow-hidden relative">
                <img
                  src={it.imagePath}
                  alt={it.name}
                  className="w-full h-full object-cover"
                />
                {it.discount > 0 && (
                  <span className="absolute top-1 right-5 bg-green-600 text-white text-sm px-1 py-0.5 rounded">
                    Save
                  </span>
                )}
              </div>
              <div className="text-lg font-medium">{it.name}</div>
              <div className="text-sm">
                {it.discount > 0 ? (
                  <>
                    <span className="line-through text-red-500 mr-1">${it.price}</span>
                    <span className="font-bold text-blue-600">${effectivePrice}</span>
                  </>
                ) : (
                  <span className="font-bold text-blue-600">${it.price}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
