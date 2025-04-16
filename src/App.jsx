// src/App.jsx
import React, { useState } from 'react';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import AddItemModal from './components/Admin/AddItemModal';
import AdminItemCard from './components/Admin/AdminItemCard';
import ProductCard from './components/Customer/ProductCard';
import LimitedSpecials from './components/Customer/LimitedSpecials';
import CartSidebar from './components/Customer/CartSidebar';

function App() {
  const [items, setItems] = useState(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      price: parseFloat((Math.random() * 10 + 2).toFixed(2)),
      category: ['Drinks', 'Snacks', 'Meals', 'Desserts'][Math.floor(Math.random() * 4)],
      imagePath: '/images/hotdog.png',
      discount: 0,
      isSpecial: false,
      disabled: false,
    }));
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const dynamicCategories = Array.from(new Set(items.map((item) => item.category))).filter(Boolean).sort();
  const allCategories = dynamicCategories;
  const customerCategories = Array.from(
    new Set(items.filter(item => !item.disabled && !item.isSpecial).map(item => item.category))
  ).sort();
  const displayedItems =
    activeCategory === 'All'
      ? items.filter((item) => !item.disabled && !item.isSpecial)
      : items.filter((item) => item.category === activeCategory && !item.disabled && !item.isSpecial);

  const addToCart = (item) => {
    const existing = cart.find((ci) => ci.id === item.id);
    if (existing) {
      setCart(cart.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((ci) => ci.id !== id));

  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((ci) => {
        if (ci.id === id) {
          const newQty = ci.quantity + amount;
          return newQty > 0 ? { ...ci, quantity: newQty } : ci;
        }
        return ci;
      })
    );
  };

  const cartTotal = cart.reduce((total, ci) => total + (ci.price * ci.quantity), 0);

  const handleAdminLogin = () => setShowLoginModal(true);
  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
  };

  const handleAddItem = (newItem) => setItems((prev) => [...prev, newItem]);

  const handleUpdateItem = (updatedItem) =>
    setItems((prev) => prev.map((it) => (it.id === updatedItem.id ? updatedItem : it)));

  const handleDeleteItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const clearCart = () => setCart([]);

  return (
    <div className="flex h-screen">
      <div className="w-4/5 flex flex-col h-full">
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
        {!isAdmin && (
          <div className="p-2 bg-gray-100 flex space-x-2 items-center">
            {['All', ...customerCategories].map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {isAdmin
              ? items.map((item) => (
                  <AdminItemCard
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                    categories={allCategories}
                  />
                ))
              : displayedItems.map((item) => (
                  <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
          </div>
        </div>
        {!isAdmin && <LimitedSpecials items={items.filter((it) => it.isSpecial && !it.disabled)} />}
      </div>
      <CartSidebar cart={cart} cartTotal={cartTotal} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />
      {showLoginModal && (
        <AdminLoginModal onClose={() => setShowLoginModal(false)} onSuccess={handleAdminSuccess} />
      )}
      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} onAdd={handleAddItem} existingCategories={allCategories} />
      )}
    </div>
  );
}

export default App;
