'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function ChatWithCheckout() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('');

  // Checkout state
  const [checkoutStatus, setCheckoutStatus] = useState('idle'); // idle, loading, waiting, completed
  const [customerSecret, setCustomerSecret] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [balance, setBalance] = useState(null);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // Poll for checkout completion after redirect
  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) return;
    pollIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch('/api/solution/checkout/status');
        const data = await response.json();
        if (data.completed) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          setCustomerSecret(data.customerSecret);
          setBalance(data.fundedAmount);
          setCheckoutStatus('completed');
          // Clear the URL param
          window.history.replaceState({}, '', '/solution/chat-checkout');
        }
      } catch (error) {
        console.error('Error polling for checkout status:', error);
      }
    }, 2000);
  }, []);

  // Check URL params on mount — customer returns here after checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'complete') {
      setCheckoutStatus('waiting');
      startPolling();
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [startPolling]);

  // Start checkout — create session and redirect to Lava's hosted checkout
  const startCheckout = async () => {
    setCheckoutStatus('loading');
    setCheckoutError(null);

    try {
      const response = await fetch('/api/solution/checkout/create', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok && data.checkoutUrl) {
        // Redirect to Lava's hosted checkout page
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Failed to create checkout session:', data.error);
        setCheckoutError(data.error || 'Failed to create checkout session');
        setCheckoutStatus('idle');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setCheckoutError('Failed to create checkout session');
      setCheckoutStatus('idle');
    }
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || !customerSecret) return;

    const userMessage = { role: 'user', content: input };

    const messagesToSend = aiPersonality.trim()
      ? [...messages, { role: 'system', content: "# IMPORTANT: " + aiPersonality }, userMessage]
      : [...messages, userMessage];

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/solution/checkout/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesToSend,
          customerSecret
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error || 'Failed to get response'}`
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input on mount and when loading completes
  useEffect(() => {
    if (!isLoading && checkoutStatus === 'completed') {
      inputRef.current?.focus();
    }
  }, [isLoading, checkoutStatus]);

  // Render checkout UI
  const renderCheckout = () => {
    if (checkoutStatus === 'waiting') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff5a1f] mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Waiting for checkout confirmation...
            </h3>
            <p className="text-gray-400">
              Your payment is being processed. This page will update automatically.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-semibold text-white mb-4">
            Subscribe to Get Started
          </h3>
          <p className="text-gray-400 mb-6">
            To use this chat, you need to complete checkout to fund your account.
            Your usage will be billed based on the AI requests you make.
          </p>
          {checkoutError && (
            <p className="text-red-400 mb-4 text-sm">{checkoutError}</p>
          )}
          <button
            onClick={startCheckout}
            disabled={checkoutStatus === 'loading'}
            className="px-6 py-3 bg-[#ff5a1f] text-white rounded-lg font-medium hover:bg-[#e64f1a] transition-colors disabled:opacity-50"
          >
            {checkoutStatus === 'loading' ? 'Redirecting...' : 'Start Checkout'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Page-specific header content */}
      <div className="text-center py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Chat with Checkout</h2>
        <p className="text-gray-400 mt-2">
          AI Chatbot with Lava Flex Checkout for customer billing
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Users complete checkout before chatting - usage is billed to their wallet
        </p>
      </div>

      {checkoutStatus !== 'completed' ? (
        renderCheckout()
      ) : (
        <>
          {/* User info banner */}
          <div className="py-3 px-4 bg-gray-900/50 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ff5a1f] flex items-center justify-center text-white text-sm font-medium">
                  C
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Connected Customer</p>
                  {balance && (
                    <p className="text-gray-500 text-xs">Funded: ${parseFloat(balance).toFixed(2)}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-xs">Billing Active</p>
              </div>
            </div>
          </div>

          {/* System Prompt Input */}
          <div className="py-3 px-4 bg-gray-900/50 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Personalize your AI: </span>
              <input
                type="text"
                value={aiPersonality}
                onChange={(e) => setAiPersonality(e.target.value)}
                placeholder="Tell your AI how you'd like it to behave"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a1f]"
              />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-12">
                <p className="text-xl">You're all set!</p>
                <p className="mt-2">Start chatting - usage will be charged to your wallet.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-[#ff5a1f] text-white'
                        : 'bg-gray-900 text-white border border-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
                  <p className="text-gray-400">Thinking...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-800 pt-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-[#ff5a1f] text-white rounded-lg font-medium hover:bg-[#e64f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}

      {/* Navigation */}
      <div className="mt-6 py-4 border-t border-gray-800 flex justify-center text-sm">
        <Link
          href="/solution/chat"
          className="inline-flex items-center bg-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
        >
          ← Back to Regular Chat
        </Link>
      </div>
    </>
  );
}
