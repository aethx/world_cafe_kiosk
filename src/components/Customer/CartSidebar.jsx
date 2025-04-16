// src/components/Customer/CartSidebar.jsx
import React from 'react';

export default function CartSidebar({ cart, cartTotal, updateQuantity, removeFromCart, clearCart }) {
  return (
    <div className="w-1/5 bg-gray-100 border-l border-gray-300 flex flex-col h-full">
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        <h2 className="text-xl font-bold">Your Order</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-3">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">Your cart is empty</div>
        ) : (
          cart.map((ci) => (
            <div key={`cart-${ci.id}`} className="flex items-center justify-between mb-3 bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <img src={ci.imagePath} alt={ci.name} className="h-8 w-8 object-cover mr-2" />
                <div>
                  <div className="font-medium">{ci.name}</div>
                  <div className="text-sm text-gray-600">
                    ${ci.discount > 0 ? (ci.price - ci.discount).toFixed(2) : ci.price} × {ci.quantity}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(ci.id, -1)} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">-</button>
                <span>{ci.quantity}</span>
                <button onClick={() => updateQuantity(ci.id, 1)} className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">+</button>
                <button onClick={() => removeFromCart(ci.id)} className="text-red-500 text-xs">✕</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span>Tax (10%):</span>
          <span>${(cartTotal * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${(cartTotal * 1.1).toFixed(2)}</span>
        </div>
        <button className={`w-full py-3 rounded font-bold ${cart.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={cart.length === 0}>
          Checkout
        </button>
        {cart.length > 0 && (
          <button onClick={clearCart} className="w-full mt-2 py-2 text-sm text-red-600 hover:text-red-800">
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}
