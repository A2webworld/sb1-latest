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
  const { products } = useProducts();
  const bestSellers = products.filter(p => p.rating >= 4.7).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const discountOffers = products.filter(p => p.isOnSale).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders over £50</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% fresh and quality products</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">Quick delivery within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find everything you need in our organized categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => onPageChange('shop')}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.productCount} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Sellers</h2>
              <p className="text-gray-600">Most popular products this week</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh products just added to our store</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discount Offers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
              <p className="text-gray-600">Limited time deals you don't want to miss</p>
            </div>
            <button
              onClick={() => onPageChange('shop')}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Latest Offers
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Subscribe to our newsletter and never miss a deal
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors">
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