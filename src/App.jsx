import React, { useState } from 'react';

const App = () => {
  // Mock data for menu items
  const allItems = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    price: (Math.random() * 10 + 2).toFixed(2),
    category: ['Drinks', 'Snacks', 'Meals', 'Desserts'][Math.floor(Math.random() * 4)],
    imagePath: '/images/hotdog.png', // Placeholder image path
    isFeatured: Math.random() > 0.8,
  }));

  // State management
  const [items, setItems] = useState(allItems);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items by category
  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setItems(allItems);
    } else {
      setItems(allItems.filter(item => item.category === category));
    }
  };

  // Add to cart function
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update quantity in cart
  const updateQuantity = (itemId, amount) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

  // Available categories
  const categories = ['All', 'Drinks', 'Snacks', 'Meals', 'Desserts'];

  return (
    <div className="flex h-screen">
      {/* Main content area (80%) */}
      <div className="w-4/5 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold">World Cafe Menu</h1>
        </div>
        
        {/* Action Bar (10% of main content) */}
        <div className="p-2 bg-gray-100 flex justify-between items-center">
          {/* Category filter buttons */}
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-white'}`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Search box (placeholder) */}
          <div>
            <input 
              type="text" 
              placeholder="Search menu..." 
              className="px-3 py-1 border rounded"
            />
          </div>
        </div>
        
        {/* Menu Grid (70% of main content) */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border shadow rounded overflow-hidden flex flex-col"
              >
                <div className="h-32 bg-gray-200 relative">
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isFeatured && (
                    <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-2 flex-grow">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{item.category}</div>
                  <div className="font-bold text-blue-600">${item.price}</div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Bar (10% of main content) */}
        <div className="p-3 bg-yellow-50 border-t border-yellow-200">
          <h3 className="text-lg font-medium text-yellow-800">Today's Specials</h3>
          <div className="flex space-x-4 overflow-x-auto py-2">
            {allItems.filter(item => item.isFeatured).slice(0, 5).map(item => (
              <div key={`featured-${item.id}`} className="flex-shrink-0 w-32 text-center">
                <div className="h-20 w-20 bg-white rounded-full mx-auto mb-1 overflow-hidden">
                  <img src={item.imagePath} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs font-bold text-blue-600">${item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cart sidebar (20%) */}
      <div className="w-1/5 bg-gray-100 border-l border-gray-300 flex flex-col h-full">
        <div className="p-4 bg-gray-200 border-b border-gray-300">
          <h2 className="text-xl font-bold">Your Order</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto p-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Your cart is empty
            </div>
          ) : (
            cart.map(item => (
              <div key={`cart-${item.id}`} className="flex justify-between items-center mb-3 bg-white p-2 rounded shadow-sm">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">${item.price} × {item.quantity}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs"
                  >
                    ✕
                  </button>
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
          
          <button 
            className={`w-full py-3 rounded font-bold ${cart.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
          
          {cart.length > 0 && (
            <button 
              onClick={() => setCart([])}
              className="w-full mt-2 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;