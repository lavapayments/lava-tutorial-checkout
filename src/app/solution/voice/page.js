'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function SolutionVoice() {
  const [text, setText] = useState('I\'m so excited for my weekend ahead at Cal Hacks!');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setIsLoading(true);
    setAudioUrl('');
    setError('');

    try {
      const response = await fetch('/api/solution/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.audioUrl) {
          setAudioUrl(data.audioUrl);
          // Auto-play the audio
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.play();
            }
          }, 100);
        } else if (data.message) {
          setError(data.message);
        }
      } else {
        setError(data.error || 'Failed to generate speech');
      }
    } catch (err) {
      setError('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Page-specific header content */}
      <div className="text-center py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Text-to-Speech Generator</h2>
        <p className="text-gray-400 mt-2">
          Complete implementation with Lava Build integration
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Check src/app/api/solution/voice/route.js to see the code
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8">
        {/* Input Form */}
        <form onSubmit={handleGenerate} className="mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text to Convert to Speech
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                disabled={isLoading}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] disabled:opacity-50 resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                Try: "The weather today is perfect for a walk in the park"
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full px-6 py-3 bg-[#ff5a1f] text-white rounded-lg font-medium hover:bg-[#e64f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating Speech...' : 'Generate Speech'}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400 text-center">Generating speech with AI...</p>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && !isLoading && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Audio:</h3>
            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              className="w-full"
              style={{
                filter: 'brightness(0.9) saturate(1.2)',
              }}
            />
          </div>
        )}

        {/* Error Display */}
        {error && !isLoading && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400">{error}</p>
          </div>
        )}

        {/* Welcome Message */}
        {!audioUrl && !isLoading && !error && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl">This is the complete solution.</p>
            <p className="mt-2">Enter text to hear AI-powered text-to-speech through Lava Build.</p>
            <p className="mt-4 text-sm">
              The AI will convert your text into natural-sounding voice audio.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 py-4 border-t border-gray-800 flex justify-between text-sm">
        <Link
          href="/solution/image"
          className="inline-flex items-center bg-sky-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors border border-sky-400/30"
        >
          ← Back: Image
        </Link>
        <div className="inline-flex items-center bg-gray-600 text-gray-300 px-5 py-2 rounded-lg text-sm font-semibold border border-gray-500">
          🎉 All Solutions Complete!
        </div>
      </div>
    </>
  );
}
