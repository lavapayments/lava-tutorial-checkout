// API Route: /api/solution/checkout/create
// Creates a Lava flex checkout session for a customer to subscribe to a plan

import { Lava } from '../../../../../../lib/index.js';

export async function POST() {
  try {
    if (!process.env.LAVA_API_KEY) {
      return Response.json(
        { error: 'LAVA_API_KEY is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    if (!process.env.LAVA_PLAN_ID) {
      return Response.json(
        { error: 'LAVA_PLAN_ID is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    // Initialize the Lava SDK
    const lava = new Lava(process.env.LAVA_API_KEY, {
      apiVersion: '2025-04-28.v1',
      baseUrl: process.env.LAVA_API_BASE_URL,
    });

    // Create a flex checkout session for the plan
    const session = await lava.flex.checkoutSessions.create({
      plan_id: process.env.LAVA_PLAN_ID,
      origin_url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
    });

    console.log('Flex checkout session created:', session);

    // session.url is a relative path — build the full checkout URL
    const lavaBaseUrl = (process.env.LAVA_API_BASE_URL || 'http://localhost:3000/v1/').replace('/v1/', '');
    const checkoutUrl = `${lavaBaseUrl}${session.url}`;

    return Response.json({
      checkoutUrl,
      sessionId: session.id,
      expiresAt: session.expires_at,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json(
      { error: 'Failed to create checkout session: ' + error.message },
      { status: 500 }
    );
  }
}
