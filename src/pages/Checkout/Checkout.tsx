import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../../contexts/CartContext';
import { X, ShoppingBag, Phone, Mail, MapPin, User } from 'lucide-react';

// Load Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_xxxxxxxxxxxxx');

console.log('💳 Stripe Promise initialized:', stripePromise);

interface CheckoutFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose, onSuccess }) => {
  console.log('💳 CheckoutForm rendered');
  const stripe = useStripe();
  const elements = useElements();
  
  const { cart, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Customer contact information (guest checkout)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Use total from context, fallback to manual calculation
  const safeTotal = total || cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  console.log('🛒 Cart:', cart);
  console.log('💰 Total from context:', total);
  console.log('💰 Safe total:', safeTotal);

  // ============= SEND ORDER TO WHATSAPP =============
  const sendOrderToWhatsApp = () => {
    const phone = '447440251589';
    
    const orderItems = cart.map(item => 
      `• ${item.name} x${item.quantity} = £${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `
🛒 *NEW ORDER - Afonja Afro Foods*
─────────────────
👤 *Customer:* ${customerName}
📞 *Phone:* ${customerPhone}
📧 *Email:* ${customerEmail || 'N/A'}
📍 *Address:* ${customerAddress}
📝 *Instructions:* ${deliveryInstructions || 'None'}
─────────────────
*ORDER ITEMS:*
${orderItems}
─────────────────
💰 *Total: £${safeTotal.toFixed(2)}*
💳 *Payment: Stripe*
✅ *Status: PAID*

📅 *Date: ${new Date().toLocaleString()}*
─────────────────
Thank you for ordering from Afonja Afro Foods! 🛒
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  // ============= HANDLE PAYMENT SUBMISSION =============
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Validate customer information
    if (!customerName || !customerPhone || !customerAddress) {
      setError('Please fill in your name, phone, and delivery address');
      setIsProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      setError('Stripe not initialized');
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(safeTotal * 100),
          currency: 'gbp',
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          deliveryInstructions,
          items: (cart || []).map(item => ({
            name: item.name || 'Product',
            price: item.price || 0,
            quantity: item.quantity || 1,
          })),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      const { clientSecret } = data;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            email: customerEmail || 'guest@afonjaafrofoods.co.uk',
            phone: customerPhone,
            address: {
              line1: customerAddress,
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Clear cart
        clearCart();
        
        // Send order to WhatsApp
        sendOrderToWhatsApp();
        
        // Call success callback
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during payment');
      console.error('Payment error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-emerald-600" />
            Checkout
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* ============ CUSTOMER CONTACT INFORMATION ============ */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-emerald-700 font-medium text-center">
              🛒 Guest Checkout - No account needed!
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              Full Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="+44 7440 251589"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600" />
              Email Address
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            <p className="text-xs text-gray-400 mt-1">We'll send your order confirmation here (optional)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              Delivery Address *
            </label>
            <textarea
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="123 Main St, London, UK"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Instructions
            </label>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Gate code, landmark, etc."
            />
          </div>

          {/* ============ CARD PAYMENT ============ */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Details *</label>
            <div className="border border-gray-300 rounded-lg p-3 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ============ ORDER SUMMARY ============ */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>£{safeTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-emerald-600">£{safeTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay £${safeTotal.toFixed(2)}`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Secure payment powered by Stripe
          </p>
        </form>
      </div>
    </div>
  );
};

// Wrapper component
const Checkout: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void }> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  console.log('💳 Checkout component rendered');
  console.log('💳 isOpen:', isOpen);
  
  if (!isOpen) {
    console.log('💳 Checkout is closed');
    return null;
  }
  
  console.log('💳 Checkout is OPEN!');
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onClose={onClose} onSuccess={onSuccess} />
    </Elements>
  );
};

export default Checkout;