import React, { useState, useRef } from 'react';

/* Modal for Admin PIN Entry with a simple numeric input */
function AdminLoginModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    // Hardcoded PIN for demo
    if (pin === '1234') {
      onSuccess();
    } else {
      alert('Incorrect PIN!');
    }
  };

  const handleCancel = () => {
    setPin('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-64">
        <h2 className="text-lg font-bold mb-2">Enter Admin PIN</h2>
        <input
          className="border p-2 w-full mb-3"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

/* Minimal modal for adding a NEW item in admin mode */
function AddItemModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [special, setSpecial] = useState(false);

  const handleAdd = () => {
    const newItem = {
      id: Date.now(), // In production, DB auto-generates IDs
      name,
      description: `Description for ${name}`,
      category,
      price,
      imagePath: file ? URL.createObjectURL(file) : '/images/placeholder.jpg',
      isFeatured: featured,
      isSpecial: special
    };
    onAdd(newItem);
    onClose();
  };

  // Enforce "only one" check for featured vs. special
  const handleFeaturedChange = (checked) => {
    setFeatured(checked);
    if (checked) setSpecial(false);
  };

  const handleSpecialChange = (checked) => {
    setSpecial(checked);
    if (checked) setFeatured(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-72">
        <h2 className="text-lg font-bold mb-4">Add New Item</h2>
        <div className="space-y-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
                checked={featured}
                onChange={(e) => handleFeaturedChange(e.target.checked)}
              />
              <span className="ml-1">Featured</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={special}
                onChange={(e) => handleSpecialChange(e.target.checked)}
              />
              <span className="ml-1">Special</span>
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

/*
  Admin Item Card with:
   - Auto-save on blur for name/category/price
   - Clickable image to open file chooser
   - isFeatured/isSpecial checkboxes (only one can be true)
   - "Delete" button
*/
function AdminItemCard({ item, onUpdate, onDelete }) {
  const [editName, setEditName] = useState(item.name);
  const [editCategory, setEditCategory] = useState(item.category);
  const [editPrice, setEditPrice] = useState(item.price);
  const [isFeatured, setIsFeatured] = useState(item.isFeatured);
  const [isSpecial, setIsSpecial] = useState(item.isSpecial);

  const fileRef = useRef(null);

  // Trigger file input click when user clicks the image
  const handleImageClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImagePath = URL.createObjectURL(file);
      // Immediately update the item with the new image
      onUpdate({ ...item, imagePath: newImagePath });
    }
  };

  // Enforce "only one" check for featured vs. special
  const handleFeaturedChange = (checked) => {
    setIsFeatured(checked);
    if (checked) setIsSpecial(false);
    handleAutoSave({ isFeatured: checked, isSpecial: checked ? false : isSpecial });
  };
  const handleSpecialChange = (checked) => {
    setIsSpecial(checked);
    if (checked) setIsFeatured(false);
    handleAutoSave({ isSpecial: checked, isFeatured: checked ? false : isFeatured });
  };

  // Called whenever user blurs out of a field or toggles
  const handleAutoSave = (additionalFields = {}) => {
    onUpdate({
      ...item,
      name: editName,
      category: editCategory,
      price: editPrice,
      isFeatured,
      isSpecial,
      ...additionalFields
    });
  };

  return (
    <div className="bg-white border shadow rounded overflow-hidden flex flex-col">
      {/* Item Image, clickable for upload */}
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
        {isFeatured && (
          <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1">
            Featured
          </span>
        )}
        {isSpecial && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
            Special
          </span>
        )}
      </div>

      {/* Inline edit fields */}
      <div className="p-2 flex-grow space-y-1">
        <input
          className="font-semibold text-lg w-full border-b focus:outline-none"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={() => handleAutoSave()}
        />
        <input
          className="text-sm text-gray-600 w-full border-b focus:outline-none"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          onBlur={() => handleAutoSave()}
        />
        <input
          className="font-bold text-blue-600 w-full border-b focus:outline-none"
          type="number"
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
          onBlur={() => handleAutoSave()}
        />
        <div className="flex items-center space-x-2 pt-1">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => handleFeaturedChange(e.target.checked)}
            />
            <span className="ml-1">Featured</span>
          </label>
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isSpecial}
              onChange={(e) => handleSpecialChange(e.target.checked)}
            />
            <span className="ml-1">Special</span>
          </label>
        </div>
      </div>

      {/* Delete Item Button */}
      <button
        onClick={() => onDelete(item.id)}
        className="w-full py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

const App = () => {
  // Original mock data with placeholders
  const [items, setItems] = useState(() => {
    const baseArray = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      price: (Math.random() * 10 + 2).toFixed(2),
      category: ['Drinks', 'Snacks', 'Meals', 'Desserts'][Math.floor(Math.random() * 4)],
      imagePath: '/images/hotdog.png',
      isFeatured: false,
      isSpecial: false
    }));
    return baseArray;
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Compute dynamic categories from items
  const dynamicCats = Array.from(new Set(items.map(it => it.category))).sort();
  const categories = ['All', ...dynamicCats];

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items by category
  const filterByCategory = (category) => {
    setActiveCategory(category);
  };

  // Cart logic
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

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, amount) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

  // Admin logic
  const handleAdminLogin = () => setShowLoginModal(true);
  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
  };
  const handleAddItem = (newItem) => {
    setItems(current => [...current, newItem]);
  };
  const handleUpdateItem = (updatedItem) => {
    setItems(curr => curr.map(it => it.id === updatedItem.id ? updatedItem : it));
  };
  const handleDeleteItem = (itemId) => {
    setItems(curr => curr.filter(it => it.id !== itemId));
  };

  // Filtered list for display
  const displayedItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="flex h-screen">
      {/* Main content area (80%) */}
      <div className="w-4/5 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold">World Cafe Menu</h1>
          {!isAdmin ? (
            <button onClick={handleAdminLogin} className="bg-gray-800 px-3 py-2 rounded">
              Admin
            </button>
          ) : (
            <button onClick={() => setIsAdmin(false)} className="bg-red-600 px-3 py-2 rounded">
              Exit Admin
            </button>
          )}
        </div>
        
        {/* Category Buttons */}
        <div className="p-2 bg-gray-100 flex space-x-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Menu Grid (70% of main content) */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {displayedItems.map((item) => {
              if (isAdmin) {
                // Admin card with auto-save fields
                return (
                  <AdminItemCard
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                  />
                );
              } else {
                // Normal customer view card
                return (
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
                );
              }
            })}
          </div>
        </div>
        
        {/* Featured Bar (visible in customer mode only) */}
        {!isAdmin && (
          <div className="p-3 bg-yellow-50 border-t border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800">Today's Specials</h3>
            <div className="flex space-x-4 overflow-x-auto py-2">
              {items.filter(it => it.isFeatured).slice(0, 5).map(it => (
                <div key={`featured-${it.id}`} className="flex-shrink-0 w-32 text-center">
                  <div className="h-20 w-20 bg-white rounded-full mx-auto mb-1 overflow-hidden">
                    <img
                      src={it.imagePath}
                      alt={it.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium">{it.name}</div>
                  <div className="text-xs font-bold text-blue-600">${it.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right Sidebar (Cart or Admin Panel) */}
      <div className="w-1/5 bg-gray-100 border-l border-gray-300 flex flex-col h-full">
        {isAdmin ? (
          // Admin Panel
          <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="block w-full mb-4 py-2 bg-green-600 text-white rounded"
            >
              Add Item
            </button>
            {/* Additional admin features here if needed */}
          </div>
        ) : (
          // Cart
          <>
            <div className="p-4 bg-gray-200 border-b border-gray-300">
              <h2 className="text-xl font-bold">Your Order</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-3">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  Your cart is empty
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`cart-${item.id}`}
                    className="flex items-center justify-between mb-3 bg-white p-2 rounded shadow-sm"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.imagePath}
                        alt={item.name}
                        className="h-8 w-8 object-cover mr-2"
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          ${item.price} × {item.quantity}
                        </div>
                      </div>
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
                className={`w-full py-3 rounded font-bold ${
                  cart.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
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
          </>
        )}
      </div>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <AdminLoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleAdminSuccess}
        />
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
};

export default App;
