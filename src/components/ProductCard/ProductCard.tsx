import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useProductModal } from '../../contexts/ProductModalContext';
import { useProducts } from '../../hooks/useProducts';
import { getSiblings } from '../../utils/productFamilies';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { openProduct } = useProductModal();
  const { products: allProducts } = useProducts();
  const siblings = getSiblings(product, allProducts);
  const hasSiblings = siblings.length > 1;
  const lowestPrice = hasSiblings
    ? Math.min(...siblings.map((s) => s.price))
    : product.price;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openProduct(product);
  };

  return (
    <div
      id={`product-${product.id}`}
      onClick={() => openProduct(product)}
      className="glass-card rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">New</span>
          )}
          {product.isOnSale && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Sale</span>
          )}
        </div>

        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            onClick={handleOpenModal}
            className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-emerald-600 transition-colors"
            aria-label="View details"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {hasSiblings && (
              <span className="text-xs font-medium text-gray-500">From</span>
            )}
            <span className="text-xl font-bold text-emerald-600">
              £{lowestPrice.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {hasSiblings && (
            <span className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
              {siblings.length} sizes
            </span>
          )}
        </div>

        {product.originalPrice && (
          <p className="text-sm font-medium text-orange-600 mb-3">
            Save £{(product.originalPrice - product.price).toFixed(2)}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
}
