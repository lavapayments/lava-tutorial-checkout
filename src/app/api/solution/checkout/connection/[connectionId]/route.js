// API Route: /api/solution/checkout/connection/[connectionId]
// Retrieves connection details by connectionId

import { Lava } from '@lavapayments/nodejs';

export async function GET(request, { params }) {
  try {
    if (!process.env.LAVA_API_KEY) {
      return Response.json(
        { error: 'LAVA_API_KEY is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    const { connectionId } = await params;

    if (!connectionId) {
      return Response.json(
        { error: 'connectionId is required' },
        { status: 400 }
      );
    }

    // Initialize the Lava SDK
    const lava = new Lava(process.env.LAVA_API_KEY, { apiVersion: '2025-04-28.v1' });

    // Retrieve connection directly by ID
    const connection = await lava.connections.retrieve(connectionId);

    console.log('Connection retrieved:', connection);

    return Response.json({
      connectionSecret: connection.connection_secret,
      firstName: connection.wallet?.first_name || '',
      lastName: connection.wallet?.last_name || '',
      balance: connection.wallet?.balance || '0',
    });

  } catch (error) {
    console.error('Error retrieving connection:', error);
    return Response.json(
      { error: 'Failed to retrieve connection: ' + error.message },
      { status: 500 }
    );
  }
}
