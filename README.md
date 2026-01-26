# Multi-Modal AI + Lava Build Workshop

Learn how to integrate multiple AI providers (Groq, Google Gemini, OpenAI) through Lava Build's AI gateway. Build three AI-powered applications in a single Next.js app.

## What You'll Build

1. **AI Chatbot** - Groq Llama 3.1-8b-instant
2. **Image Analyzer** - Google Gemini 2.0-flash
3. **Text-to-Speech** - OpenAI TTS-1

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- Basic JavaScript/React knowledge
- Lava API key from [Lava Dashboard](https://www.lavapayments.com/dashboard/build/keys)
- Funds in your Lava account (make sure to claim your $10 of credits!)

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/lavapayments/lava-tutorial.git
cd lava-tutorial
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your LAVA_API_KEY, secrets, and API URLs

# 3. Run the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Workshop Structure

| Use Case | Workshop Route | API Route | 
|----------|----------------|-----------|
| Chat | `/workshop/chat` | `src/app/api/workshop/chat/route.js` | 
| Image | `/workshop/image` | `src/app/api/workshop/image/route.js` | 
| Voice | `/workshop/voice` | `src/app/api/workshop/voice/route.js` | 

**Pattern:** Explore UI → Complete TODOs → Test → Compare with `/solution/*`
---

## Project Structure

```
lava-tutorial/
├── src/
│   └── app/
│       ├── page.js                    # Home page
│       ├── globals.css                # Global styles
│       ├── layout.js                  # Root layout
│       ├── workshop/
│       │   ├── layout.js              # Workshop navigation
│       │   ├── page.js                # Workshop hub
│       │   ├── chat/page.js           # Chat UI (workshop)
│       │   ├── image/page.js          # Image UI (workshop)
│       │   └── voice/page.js          # Voice UI (workshop)
│       ├── solution/
│       │   ├── layout.js              # Solution navigation
│       │   ├── page.js                # Solution hub
│       │   ├── chat/page.js           # Chat UI (complete)
│       │   ├── image/page.js          # Image UI (complete)
│       │   └── voice/page.js          # Voice UI (complete)
│       └── api/
│           ├── workshop/
│           │   ├── chat/route.js      # Chat API (TODOs)
│           │   ├── image/route.js     # Image API (TODOs)
│           │   └── voice/route.js     # Voice API (TODOs)
│           └── solution/
│               ├── chat/route.js      # Chat API (complete)
│               ├── image/route.js     # Image API (complete)
│               └── voice/route.js     # Voice API (complete)
├── .env.example                       # Example environment variables
├── .env                               # Your API keys and secrets (don't commit!)
└── package.json                       # Dependencies
```

## Tech Stack

- **Next.js 15** - React framework with App Router and Turbopack
- **Tailwind CSS 4** - Styling
- **Lava Build** - AI gateway for 20+ providers. Lava Build acts as a transparent proxy and enables usage tracking and monetization capabilities. 

## How Lava Build Works

Lava Build is a **API gateway** for 20+ AI providers:

```javascript
// Single API endpoint pattern
const lavaForwardUrl = `${LAVA_FORWARD_URL}${AI_PROVIDER_API_URL}`;

// Authenticated with forward token
const lavaForwardToken = {
  secret_key: LAVA_API_KEY,
  connection_secret: CONNECTION_SECRET,
  product_secret: PRODUCT_SECRET
};
const encodedToken = Buffer.from(JSON.stringify(lavaForwardToken)).toString('base64');

fetch(lavaForwardUrl, {
  headers: { 'Authorization': `Bearer ${encodedToken}` },
  // ... provider-specific body
});
```

**Benefits:**
- ✅ One API for all providers (Groq, Gemini, OpenAI, etc.)
- ✅ Pay for only what you use
- ✅ Built-in usage tracking & monetization
- ✅ < 20ms latency overhead

## Resources

**Lava Build:**
- [Lava Documentation](https://www.lavapayments.com/docs)
- [Lava API Reference](https://www.lavapayments.com/docs/api-reference/introduction)

**AI Providers:**
- [Groq Chat Completions](https://console.groq.com/docs/text-chat) - Llama models
- [Google Gemini API](https://ai.google.dev/gemini-api/docs/vision) - Image analysis
- [OpenAI Text-to-Speech](https://platform.openai.com/docs/guides/text-to-speech) - Voice generation

**Framework:**
- [Next.js Documentation](https://nextjs.org/docs)
---

**Need help?** Check `/solution/*` routes or reach out on [Discord](https://discord.gg/7bkJnVsD7Y)
