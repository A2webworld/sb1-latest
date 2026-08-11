import React from 'react';
import { Truck, Award, Shield, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Afonja Afro Foods</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to <strong>Afonja Afro Foods</strong> – your trusted African supermarket in the UK. 
            We are dedicated to bringing the authentic taste of Africa to your doorstep.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to provide high-quality African food products to the African diaspora 
            and food lovers across the United Kingdom. We source our products directly from trusted 
            suppliers to ensure freshness and authenticity.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Fresh African vegetables (Ugu, Bitter Leaf, Ewedu, Okra)</li>
            <li>Authentic cooking oils (Palm Oil, Olive Oil, Sunflower Oil)</li>
            <li>Traditional seasonings and spices</li>
            <li>Grains and flours (Garri, Yam Flour, Rice)</li>
            <li>Fresh meats and poultry</li>
            <li>Frozen foods and snacks</li>
            <li>Household items and personal care products</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Truck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-gray-500">Free delivery on orders over £50</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Quality Guarantee</h3>
                <p className="text-sm text-gray-500">100% fresh and authentic products</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-gray-500">Competitive prices guaranteed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Quick Service</h3>
                <p className="text-sm text-gray-500">Delivery within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
          <p className="text-gray-700">📍 <strong>Visit Us:</strong> 3 Southend Rd, Grays RM17 5NH, United Kingdom</p>
          <p className="text-gray-700 mt-2">📞 <strong>Call Us:</strong> +44 7440251589</p>
          <p className="text-gray-700 mt-2">📧 <strong>Email:</strong> info@afonjaafrofoods.co.uk</p>
        </div>
      </div>
    </div>
  );
}
