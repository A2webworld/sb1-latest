import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartDropdownProps {
  onClose: () => void;
  onOpenCheckout: () => void;
}

export default function CartDropdown({ onClose, onOpenCheckout }: CartDropdownProps) {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();

  // ============ EMPTY STATE ============
  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
            Shopping Cart
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="text-center py-10 px-4">
          <div className="bg-emerald-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-emerald-500" />
          </div>
          <p className="text-gray-700 font-medium mb-1">Your cart is empty</p>
          <p className="text-gray-400 text-sm mb-4">Add some products to get started</p>
          <button
            onClick={onClose}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            Continue shopping →
          </button>
        </div>
      </div>
    );
  }

  // ============ CART WITH ITEMS ============
  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-emerald-600" />
          Shopping Cart
          <span className="text-xs font-normal text-gray-500">
            ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
          aria-label="Close cart"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Items list */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 p-4 hover:bg-gray-50 transition-colors">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 object-cover rounded-lg border border-gray-100 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=?';
              }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {item.name}
              </h4>
              <p className="text-sm font-semibold text-emerald-600 mb-2">
                £{item.price.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-lg font-bold text-gray-900">£{total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Shipping & taxes calculated at checkout</p>
        <button
          onClick={() => {
            onOpenCheckout();
            onClose();
          }}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-600 hover:text-emerald-600 py-2"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}