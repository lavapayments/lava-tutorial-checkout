// API Route: /api/solution/webhooks/lava
// Receives checkout.completed webhook from Lava after a customer completes checkout.
// Stores the customer_secret so it can be used to generate forward tokens.

import { Webhooks } from '../../../../../../lib/index.js';

// In-memory store for demo purposes. In production, save to a database.
// Keyed by customer_id for easy lookup.
const customerStore = globalThis.__lavaCustomerStore || (globalThis.__lavaCustomerStore = new Map());

export { customerStore };

export async function POST(request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('X-Lava-Signature') ?? '';

    // Webhooks.verify() is SYNCHRONOUS — do not use await
    const result = Webhooks.verify({
      payload,
      signature,
      secret: process.env.LAVA_WEBHOOK_SECRET,
    });

    if (!result.valid) {
      console.error('Webhook signature invalid:', result.error);
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);
    console.log('Received webhook:', event.type);

    if (event.type === 'checkout.completed') {
      const { customer_id, customer_secret, plan_id, funded_amount } = event.data;

      // Store the customer secret for use in forward tokens
      customerStore.set(customer_id, {
        customerSecret: customer_secret,
        planId: plan_id,
        fundedAmount: funded_amount,
        completedAt: new Date().toISOString(),
      });

      console.log('=== CHECKOUT COMPLETED ===');
      console.log('Customer ID:     ', customer_id);
      console.log('Customer Secret: ', customer_secret);
      console.log('Plan ID:         ', plan_id);
      console.log('Funded Amount:   ', funded_amount);
      console.log('==========================');
    }

    return Response.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
