// src/components/Admin/AdminLoginModal.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function AdminLoginModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setPin('');
    setError('');
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    if (pin === '1234') {
      onSuccess();
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  const handleCancel = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-64">
        <h2 className="text-lg font-bold mb-2">Enter Admin PIN</h2>
        <input
          ref={inputRef}
          autoFocus
          type="password"
          className="border p-2 w-full mb-1"
          value={pin}
          onChange={e => { setPin(e.target.value); setError(''); }}
        />
        {error && <div className="text-xs text-red-600 mb-2">{error}</div>}
        <div className="flex justify-end space-x-2">
          <button onClick={handleCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Enter</button>
        </div>
      </div>
    </div>
  );
}
