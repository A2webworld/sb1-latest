import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartDropdownProps {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 py-3 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">£{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total: £{total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}