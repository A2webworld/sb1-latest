import React from 'react';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import HeroCarousel from '../../components/Hero/HeroCarousel';
import ProductCard from '../../components/ProductCard/ProductCard';
import TestimonialsCarousel from '../../components/TestimonialsCarousel/TestimonialsCarousel';
import { useProducts } from '../../hooks/useProducts';
import { categories } from '../../data/categories';

interface HomeProps {
  onPageChange: (page: string) => void;
}

export default function Home({ onPageChange }: HomeProps) {
  const { products } = useProducts(true, '/products.json');
  const bestSellers = products.filter(p => p.rating >= 4.7).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const discountOffers = products.filter(p => p.isOnSale).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <HeroCarousel onPageChange={onPageChange} />
      </section>

      {/* Features Section - Mobile Responsive */}
      <section className="bg-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">Free Delivery</h3>
              <p className="text-[10px] sm:text-sm text-gray-600">Free delivery on orders over £50</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">Quality Guarantee</h3>
              <p className="text-[10px] sm:text-sm text-gray-600">100% fresh and quality products</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">Fast Service</h3>
              <p className="text-[10px] sm:text-sm text-gray-600">Quick delivery within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">Best Prices</h3>
              <p className="text-[10px] sm:text-sm text-gray-600">Competitive prices guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Mobile Responsive */}
      <section className="bg-gray-50 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Shop by Category</h2>
            <p className="text-sm sm:text-lg text-gray-600">Find everything you need in our organized categories</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {categories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => onPageChange('shop')}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-3 sm:p-4"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-3">{category.icon}</div>
                  <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-2 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500">{category.productCount} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section - Mobile Responsive */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Best Sellers</h2>
              <p className="text-xs sm:text-base text-gray-600">Most popular products this week</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-1 sm:space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section - Mobile Responsive */}
      <section className="bg-gray-50 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">New Arrivals</h2>
              <p className="text-xs sm:text-base text-gray-600">Fresh products just added to our store</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-1 sm:space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discount Offers Section - Mobile Responsive */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Special Offers</h2>
              <p className="text-xs sm:text-base text-gray-600">Limited time deals you don't want to miss</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-1 sm:space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm sm:text-base"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {discountOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Mobile Responsive */}
      <section className="bg-emerald-600 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
            Stay Updated with Our Latest Offers
          </h2>
          <p className="text-sm sm:text-lg text-emerald-100 mb-4 sm:mb-8">
            Subscribe to our newsletter and never miss a deal
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 mb-2 sm:mb-0"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
    </div>
  );
}
