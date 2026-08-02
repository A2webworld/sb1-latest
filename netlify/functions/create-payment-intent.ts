import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { amount, currency, customerName, customerEmail, customerAddress, items } = JSON.parse(event.body || '{}');

    // Validate amount
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency || 'gbp',
      metadata: {
        customerName: customerName || 'Guest',
        customerEmail: customerEmail || 'guest@example.com',
        customerAddress: customerAddress || '',
        items: JSON.stringify(items || []),
      },
      shipping: {
        name: customerName || 'Guest',
        address: {
          line1: customerAddress || '',
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Payment processing error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
