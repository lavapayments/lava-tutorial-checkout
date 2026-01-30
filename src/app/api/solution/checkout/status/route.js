// API Route: /api/solution/checkout/status
// Polls for checkout completion by checking if the webhook has stored a customer secret.

import { customerStore } from '../../webhooks/lava/route';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customer_id');

  // If a specific customer ID is provided, check for it
  if (customerId) {
    const customer = customerStore.get(customerId);
    if (customer) {
      return Response.json({ completed: true, ...customer });
    }
    return Response.json({ completed: false });
  }

  // Otherwise return the most recently completed customer (for demo convenience)
  if (customerStore.size > 0) {
    const entries = Array.from(customerStore.entries());
    const [latestId, latestData] = entries[entries.length - 1];
    return Response.json({ completed: true, customerId: latestId, ...latestData });
  }

  return Response.json({ completed: false });
}
