// API Route: /api/solution/checkout/create
// Creates a Lava checkout session for customer onboarding

import { Lava } from '@lavapayments/nodejs';

export async function POST(request) {
  try {
    if (!process.env.LAVA_API_KEY) {
      return Response.json(
        { error: 'LAVA_API_KEY is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    // Initialize the Lava SDK
    const lava = new Lava(process.env.LAVA_API_KEY, { apiVersion: '2025-04-28.v1' });

    // Create a checkout session for onboarding
    // This allows the customer to connect their payment method
    const session = await lava.checkoutSessions.create({
      checkout_mode: 'onboarding',
      origin_url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    });

    console.log('Checkout session created:', session);

    return Response.json({
      checkoutToken: session.checkout_session_token,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json(
      { error: 'Failed to create checkout session: ' + error.message },
      { status: 500 }
    );
  }
}
