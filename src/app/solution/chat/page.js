'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SolutionChat() {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(''); // State to store user input
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [aiPersonality, setAiPersonality] = useState(''); // State to store AI personality context

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Form submission logic 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };

    // Build messages array with AI personality if provided
    const messagesToSend = aiPersonality.trim()
      ? [...messages, { role: 'system', content: "# IMPORTANT: " + aiPersonality }, userMessage]
      : [...messages, userMessage];

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Call API route and error handling
    try {
      const response = await fetch('/api/solution/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesToSend }),
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
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  // Render the UI
  return (
    <>
      {/* Page-specific header content */}
      <div className="text-center py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Conversational AI Chatbot</h2>
        <p className="text-gray-400 mt-2">
          Complete implementation with Lava Build integration
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Check src/app/api/solution/chat/route.js to see the code
        </p>
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
            <p className="text-xl">This is a sample solution.</p>
            <p className="mt-2">Try chatting to see Lava work in real time.</p>
            <p className="mt-4 text-sm">
              Check src/app/api/solution/chat/route.js to see the implementation.
            </p>
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

        {/* Scroll marker */}
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

      {/* Navigation */}
      <div className="mt-6 py-4 border-t border-gray-800 flex justify-center gap-4 text-sm">
        <Link
          href="/solution/chat-checkout"
          className="inline-flex items-center bg-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
        >
          See Chat with Billing Enabled
        </Link>
        <Link
          href="/solution/image"
          className="inline-flex items-center bg-sky-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors border border-sky-400/30"
        >
          Next: Image Analyzer →
        </Link>
      </div>
    </>
  );
}
