import React from 'react';
import { Truck, Clock, MapPin } from 'lucide-react';

export default function DeliveryInfo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Delivery Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Truck className="h-6 w-6 text-emerald-600 mr-2" />
            Delivery Options
          </h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-lg">Standard Delivery</h3>
              <p className="text-gray-600">£3.99 - Delivery within 2-3 business days</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-lg">Express Delivery</h3>
              <p className="text-gray-600">£6.99 - Delivery within 1-2 business days</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Free Delivery</h3>
              <p className="text-gray-600">Free on orders over £50 (Standard Delivery)</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-6 w-6 text-emerald-600 mr-2" />
            Delivery Times
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Orders placed before 2pm are dispatched the same day</li>
            <li>• Orders placed after 2pm are dispatched the next business day</li>
            <li>• Weekday deliveries: Monday - Friday, 8am - 6pm</li>
            <li>• Saturday deliveries: 9am - 3pm</li>
            <li>• No deliveries on Sundays or public holidays</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
            Delivery Areas
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• 🏙️ London and surrounding areas</li>
            <li>• 🏘️ Essex, Kent, Surrey, Hertfordshire</li>
            <li>• 🏴󠁧󠁢󠁥󠁮󠁧󠁿 All major cities in England</li>
            <li>• 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (extra delivery time may apply)</li>
            <li>• 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales (extra delivery time may apply)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
