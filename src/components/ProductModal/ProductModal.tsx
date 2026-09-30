import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative bg-gray-50 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 md:h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=Product';
              }}
            />
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              {product.isNew && (
                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">New</span>
              )}
              {product.isOnSale && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Sale</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.rating.toFixed(1)} ({product.reviewCount ?? 0} reviews)
              </span>
            </div>

            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-3xl font-bold text-emerald-600">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <p className="text-sm font-medium text-orange-600 mb-4">
                You save £{(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description || 'A quality product from Afonja Afro Foods.'}
            </p>

            {/* Category + stock */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              {product.category && (
                <span>Category: <strong className="text-gray-700 capitalize">{product.category.replace(/-/g, ' ')}</strong></span>
              )}
              {product.inStock ? (
                <span className="text-emerald-600 font-medium">● In stock</span>
              ) : (
                <span className="text-red-500 font-medium">● Out of stock</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  product.inStock
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border transition-colors ${
                  inWishlist
                    ? 'bg-red-500 text-white border-red-500'
                    : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Free delivery on orders over £50</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Quality guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-emerald-600" />
                <span>Easy returns within 14 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
