import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { categories } from '../../data/categories';
import CartDropdown from './CartDropdown';
import SearchDropdown from './SearchDropdown';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPageChange('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <span>Free delivery on orders over £50!</span>
            <div className="flex items-center space-x-4">
              <span>📞 +447440251589</span>
              <span>📧 info@afonjaafrofoods.co.uk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange('home')}>
            <h1 className="text-2xl font-bold text-emerald-600">
                Afonja <span className="text-orange-500">Afro Foods</span>
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
            {isSearchOpen && (
              <SearchDropdown
                query={searchQuery}
                onClose={() => setIsSearchOpen(false)}
                onProductSelect={() => {
                  setIsSearchOpen(false);
                  onPageChange('shop');
                }}
              />
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
            </div>

            {/* User Account */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-emerald-600 ml-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center space-x-8 py-3">
            <button
              onClick={() => onPageChange('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('shop')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'shop' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Shop All
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => onPageChange('shop')}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => onPageChange('contact')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'contact' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onPageChange('home');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onPageChange('shop');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Shop All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onPageChange('shop');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
                >
                  {category.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onPageChange('contact');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
