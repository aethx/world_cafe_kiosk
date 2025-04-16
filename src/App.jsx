import React, { useState, useRef, useEffect } from 'react';

/* ==================================================
   ADMIN LOGIN MODAL
   ================================================== */
function AdminLoginModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    setPin('');
  }, []);

  const handleSubmit = () => {
    if (pin === '1234') {
      onSuccess();
    } else {
      alert('Incorrect PIN!');
      setPin(''); // Reset immediately
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
          autoFocus
          className="border p-2 w-full mb-3"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
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

/* ==================================================
   ADD ITEM MODAL (ADMIN)
   ================================================== */
function AddItemModal({ onClose, onAdd, existingCategories }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [file, setFile] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // State for field tooltips
  const [showNameHelp, setShowNameHelp] = useState(false);
  const [showCategoryHelp, setShowCategoryHelp] = useState(false);
  const [showPriceHelp, setShowPriceHelp] = useState(false);
  const [showDiscountHelp, setShowDiscountHelp] = useState(false);

  const handleAdd = () => {
    const newItem = {
      id: Date.now(), // In a real DB, ID is auto-assigned.
      name,
      description: `Description for ${name}`,
      category,
      price: parseFloat(price) || 0,
      discount: parseFloat(discount) || 0,
      imagePath: file ? URL.createObjectURL(file) : '/images/placeholder.jpg',
      isSpecial,
      disabled
    };
    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Add New Item</h2>
        <div className="space-y-2">
          {/* Name Field */}
          <div className="relative flex items-center">
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          {/* Category Field */}
          {existingCategories.length > 0 && !isCreatingCategory ? (
            <div className="relative flex items-center">
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
              <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
                ℹ️
              </button>
              {showCategoryHelp && (
                <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
                  Category
                </div>
              )}
            </div>
          ) : (
            <div className="relative flex items-center">
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
                ℹ️
              </button>
              {showCategoryHelp && (
                <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
                  Category
                </div>
              )}
            </div>
          )}
          {/* Price Field */}
          <div className="relative flex items-center">
            <input
              type="number"
              className="border p-2 w-full"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              className="border p-2 w-full"
              placeholder="Discount Amount ($)"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button onClick={() => setShowDiscountHelp(!showDiscountHelp)} className="ml-1 text-gray-500">
              ℹ️
            </button>
            {showDiscountHelp && (
              <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
                Discount is the dollar amount to subtract.
              </div>
            )}
          </div>
          {/* File Upload Field */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
          {/* Special & Disabled Fields */}
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

/* ==================================================
   ADMIN ITEM CARD (INLINE EDITING)
   ================================================== */
function AdminItemCard({ item, onUpdate, onDelete, categories: existingCategories }) {
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
    if (fileRef.current) {
      fileRef.current.click();
    }
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
      ...additionalFields
    });
  };

  const renderCategoryField = () => {
    if (existingCategories.length > 0 && !isCreatingCategory) {
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
            {existingCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
            <option value="CREATE_NEW">Create New</option>
          </select>
          <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showCategoryHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Category
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
            onBlur={() => {
              setIsCreatingCategory(false);
              handleAutoSave();
            }}
          />
          <button onClick={() => setShowCategoryHelp(!showCategoryHelp)} className="ml-1 text-gray-500">
            ℹ️
          </button>
          {showCategoryHelp && (
            <div className="absolute top-full left-0 mt-1 p-1 bg-gray-700 text-white text-xs rounded">
              Category
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="bg-white border shadow rounded overflow-hidden flex flex-col">
      {/* Image Section */}
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
      {/* Inline Editing Fields */}
      <div className="p-2 flex-grow space-y-1">
        {/* Name Field */}
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
            placeholder=""
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
        {/* Special & Disabled Toggle */}
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
      <button
        onClick={() => onDelete(item.id)}
        className="w-full py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

/* ==================================================
   MAIN APP COMPONENT
   ================================================== */
const App = () => {
  const [items, setItems] = useState(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      price: (Math.random() * 10 + 2).toFixed(2),
      category: ['Drinks', 'Snacks', 'Meals', 'Desserts'][Math.floor(Math.random() * 4)],
      imagePath: '/images/hotdog.png',
      discount: 0,
      isSpecial: false,
      disabled: false
    }));
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const dynamicCategories = Array.from(new Set(items.map(item => item.category))).filter(Boolean).sort();
  const allCategories = dynamicCategories;

  const customerCategories = Array.from(new Set(
    items.filter(item => !item.disabled && !item.isSpecial).map(item => item.category)
  )).sort();

  const displayedItems =
    activeCategory === 'All'
      ? items.filter(item => !item.disabled && !item.isSpecial)
      : items.filter(item => item.category === activeCategory && !item.disabled && !item.isSpecial);

  const addToCart = (item) => {
    const existing = cart.find(ci => ci.id === item.id);
    if (existing) {
      setCart(cart.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(ci => ci.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(ci => {
      if (ci.id === id) {
        const newQty = ci.quantity + amount;
        return newQty > 0 ? { ...ci, quantity: newQty } : ci;
      }
      return ci;
    }));
  };

  const cartTotal = cart.reduce((total, ci) => total + (parseFloat(ci.price) * ci.quantity), 0);

  const handleAdminLogin = () => setShowLoginModal(true);
  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
  };

  const handleAddItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(prev => prev.map(it => it.id === updatedItem.id ? updatedItem : it));
  };

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

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
            {['All', ...customerCategories].map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'}`}
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
              ? items.map(item => (
                  <AdminItemCard
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                    categories={allCategories}
                  />
                ))
              : displayedItems.map(item => (
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
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
            }
          </div>
        </div>
        {!isAdmin && (
          <div className="p-3 bg-yellow-50 border-t border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800">Limited Time Specials</h3>
            <div className="flex space-x-4 overflow-x-auto py-2">
              {items.filter(it => it.isSpecial && !it.disabled).slice(0, 5).map(it => (
                <div key={`special-${it.id}`} className="flex-shrink-0 w-32 text-center relative">
                  <div className="h-20 w-20 bg-white rounded-full mx-auto mb-1 overflow-hidden relative">
                    <img
                      src={it.imagePath}
                      alt={it.name}
                      className="w-full h-full object-cover"
                    />
                    {it.discount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs px-1 rounded">
                        Save ${it.discount}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium">{it.name}</div>
                  <div className="text-xs">
                    {it.discount > 0 ? (
                      <>
                        <span className="line-through text-red-500 mr-1">${it.price}</span>
                        <span className="font-bold text-blue-600">${(it.price - it.discount).toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-blue-600">${it.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-1/5 bg-gray-100 border-l border-gray-300 flex flex-col h-full">
        {isAdmin ? (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Admin Panel</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="block w-full mb-4 py-2 bg-green-600 text-white rounded"
            >
              Add Item
            </button>
          </div>
        ) : (
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
              <button
                className={`w-full py-3 rounded font-bold ${cart.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={cart.length === 0}
              >
                Checkout
              </button>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="w-full mt-2 py-2 text-sm text-red-600 hover:text-red-800">
                  Clear Cart
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {showLoginModal && (
        <AdminLoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleAdminSuccess}
        />
      )}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
          existingCategories={allCategories}
        />
      )}
    </div>
  );
};

export default App;
