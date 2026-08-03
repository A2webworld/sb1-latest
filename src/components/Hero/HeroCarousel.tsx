import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

interface HeroCarouselProps {
  onPageChange?: (page: string) => void;
}

const slides = [
  {
    id: 1,
    title: 'Fresh Groceries Delivered',
    subtitle: 'Get the freshest produce delivered to your doorstep',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Shop Now',
    discount: 'Up to 30% Off'
  },
  {
    id: 2,
    title: 'Organic & Natural Products',
    subtitle: 'Discover our premium selection of organic foods',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Explore Organic',
    discount: 'Free Delivery'
  },
  {
    id: 3,
    title: 'Weekly Special Offers',
    subtitle: 'Save big on your favorite grocery items',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'View Deals',
    discount: 'Save 50%'
  }
];

export default function HeroCarousel({ onPageChange }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = () => {
    if (onPageChange) {
      onPageChange('shop');
    } else {
      window.location.href = '/shop';
    }
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <div className="inline-block bg-orange-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-medium mb-2 sm:mb-4">
                  {slide.discount}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8 text-gray-200">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={handleCtaClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-lg transition-colors duration-300 flex items-center space-x-2 mx-auto"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{slide.cta}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 sm:p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 sm:p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
