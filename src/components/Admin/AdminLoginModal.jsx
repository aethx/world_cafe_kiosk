// src/components/Admin/AdminLoginModal.jsx
import React, { useState, useEffect } from 'react';

export default function AdminLoginModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    // Clear the PIN input on mount.
    setPin('');
  }, []);

  const handleSubmit = () => {
    if (pin === '1234') {
      onSuccess();
    } else {
      alert('Incorrect PIN!');
      setPin(''); // Reset immediately on wrong PIN.
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
          type="password"
          className="border p-2 w-full mb-3"
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
