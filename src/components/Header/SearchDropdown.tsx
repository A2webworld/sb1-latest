import React from 'react';
import { Search } from 'lucide-react';
import { products } from '../../data/products';

interface SearchDropdownProps {
  query: string;
  onClose: () => void;
  onProductSelect: () => void;
}

export default function SearchDropdown({ query, onClose, onProductSelect }: SearchDropdownProps) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  if (!query || filteredProducts.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-50">
        <div className="p-4 text-center text-gray-500">
          {query ? 'No products found' : 'Start typing to search...'}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-2">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => {
              onProductSelect();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg text-left"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-10 w-10 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">£{product.price.toFixed(2)}</p>
            </div>
          </button>
        ))}
        <div className="border-t mt-2 pt-2">
          <button
            onClick={() => {
              onProductSelect();
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">View all results for "{query}"</span>
          </button>
        </div>
      </div>
    </div>
  );
}