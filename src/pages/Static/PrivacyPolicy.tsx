import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-600 mb-4">Last updated: August 2026</p>
          
          <p className="text-gray-700 mb-6">
            At <strong>Afonja Afro Foods</strong>, we take your privacy seriously. This Privacy Policy 
            explains how we collect, use, and protect your personal information.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lock className="h-6 w-6 text-emerald-600 mr-2" />
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Name and contact information (email, phone number, address)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Order history and preferences</li>
            <li>IP address and browsing behavior</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="h-6 w-6 text-emerald-600 mr-2" />
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>To process and deliver your orders</li>
            <li>To communicate with you about your orders</li>
            <li>To improve our products and services</li>
            <li>To send you promotional offers (you can opt out anytime)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="h-6 w-6 text-emerald-600 mr-2" />
            Data Security
          </h2>
          <p className="text-gray-600 mb-6">
            We use industry-standard security measures to protect your personal information. 
            All payment transactions are processed securely through Stripe, and we never store 
            your credit card details on our servers.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700">📧 <strong>Contact us:</strong> info@afonjaafrofoods.co.uk</p>
            <p className="text-gray-700 mt-2">📍 <strong>Address:</strong> 3 Southend Rd, Grays RM17 5NH, United Kingdom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
