import React from 'react';
import { RefreshCw, Clock, DollarSign, Package } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Return Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-600 mb-4">Last updated: August 2026</p>
          
          <p className="text-gray-700 mb-6">
            At <strong>Afonja Afro Foods</strong>, we want you to be completely satisfied with your purchase. 
            If you're not happy with your order, we're here to help.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-6 w-6 text-emerald-600 mr-2" />
            Returns Window
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li><strong>Fresh Produce:</strong> Must be reported within 24 hours of delivery</li>
            <li><strong>Dry Goods:</strong> 14 days from date of delivery</li>
            <li><strong>Frozen Items:</strong> Must be reported within 48 hours of delivery</li>
            <li><strong>Damaged Items:</strong> Report immediately with photo evidence</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Package className="h-6 w-6 text-emerald-600 mr-2" />
            Return Conditions
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Items must be in their original condition</li>
            <li>Produce items must show clear signs of spoilage</li>
            <li>Packaging must be intact (unless damaged in transit)</li>
            <li>Return shipping costs are covered by us for damaged items</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <DollarSign className="h-6 w-6 text-emerald-600 mr-2" />
            Refund Process
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Refunds are processed to your original payment method</li>
            <li>Refunds appear within 3-5 business days</li>
            <li>Partial refunds may be issued for partially used items</li>
            <li>You will receive a confirmation email once your refund is processed</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <RefreshCw className="h-6 w-6 text-emerald-600 mr-2" />
            How to Request a Return
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
            <li>Email us at info@afonjaafrofoods.co.uk</li>
            <li>Include your order number and reason for return</li>
            <li>Attach photos of damaged/spoiled items (if applicable)</li>
            <li>Wait for our team to confirm your return</li>
          </ol>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-800 mb-2">Need Help?</h3>
            <p className="text-gray-700">📧 <strong>Email:</strong> info@afonjaafrofoods.co.uk</p>
            <p className="text-gray-700 mt-1">📞 <strong>Phone:</strong> +44 7440251589</p>
            <p className="text-gray-700 mt-1">📍 <strong>Address:</strong> 3 Southend Rd, Grays RM17 5NH, United Kingdom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
