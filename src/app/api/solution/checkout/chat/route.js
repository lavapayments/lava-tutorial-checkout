// API Route: /api/solution/checkout/chat
// Chat endpoint that bills usage to the customer's wallet via flex forward token

import { Lava } from '../../../../../../lib/index.js';

export async function POST(request) {
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

    const { messages, customerSecret } = await request.json();

    if (!customerSecret) {
      return Response.json(
        { error: 'customerSecret is required. Please complete checkout first.' },
        { status: 400 }
      );
    }

    // Initialize the Lava SDK
    const lava = new Lava(process.env.LAVA_API_KEY, {
      apiVersion: '2025-04-28.v1',
      baseUrl: process.env.LAVA_API_BASE_URL,
    });

    // Generate a flex L3 forward token using the customer's profile secret and plan
    // This will bill usage to the customer's wallet
    const forwardToken = lava.generateForwardToken({
      customer_profile_secret: customerSecret,
      plan_id: process.env.LAVA_PLAN_ID,
    });

    // Configure the API URL
    const lavaForwardUrl = process.env.LAVA_FORWARD_URL || 'http://localhost:3000/v1/forward?u=';
    const chatEndpoint = process.env.AI_CHAT_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const lavaApiUrl = lavaForwardUrl + chatEndpoint;
    const model = 'llama-3.1-8b-instant';

    // Call the AI API through Lava
    const response = await fetch(lavaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${forwardToken}`
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lava API error:', errorData);
      return Response.json(
        { error: 'Failed to get response from AI. Check your configuration.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    const aiMessage = data.choices[0].message.content;

    return Response.json({ message: aiMessage });

  } catch (error) {
    console.error('Error in checkout chat API:', error);
    return Response.json(
      { error: 'Failed to get response from AI: ' + error.message },
      { status: 500 }
    );
  }
}
