import React from 'react';
import { FileText, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-600 mb-4">Last updated: August 2026</p>
          
          <p className="text-gray-700 mb-6">
            Welcome to <strong>Afonja Afro Foods</strong>. By using our website and services, 
            you agree to the following terms and conditions.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <ShoppingBag className="h-6 w-6 text-emerald-600 mr-2" />
            Orders and Payments
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>All orders are subject to availability</li>
            <li>Prices are in GBP (£) and include VAT where applicable</li>
            <li>Payment is processed securely through Stripe</li>
            <li>We reserve the right to cancel any order</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-emerald-600 mr-2" />
            Delivery
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Delivery times are estimates and not guaranteed</li>
            <li>We deliver to all UK addresses</li>
            <li>Free delivery on orders over £50</li>
            <li>You must provide accurate delivery information</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="h-6 w-6 text-emerald-600 mr-2" />
            Returns and Refunds
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Fresh produce must be reported within 24 hours of delivery</li>
            <li>Damaged items will be replaced or refunded</li>
            <li>You must provide photo evidence of damaged items</li>
            <li>Refunds are processed within 3-5 business days</li>
          </ul>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700">📧 <strong>Email:</strong> info@afonjaafrofoods.co.uk</p>
            <p className="text-gray-700 mt-2">📞 <strong>Phone:</strong> +44 7440251589</p>
            <p className="text-gray-700 mt-2">📍 <strong>Address:</strong> 3 Southend Rd, Grays RM17 5NH, United Kingdom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
