"use client";

import { useChat } from 'ai/react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Icon } from '@/components/ui/Icon';
import { useEffect, useRef } from 'react';

export function AIAssistantPanel() {
  const isAIPanelOpen = usePortfolioStore((state) => state.isAIPanelOpen);
  const toggleAIPanel = usePortfolioStore((state) => state.toggleAIPanel);
  const userProfile = usePortfolioStore((state) => state.userProfile);
  const assets = usePortfolioStore((state) => state.assets);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // We stringify the portfolio data to pass as initial context or as a system-like message
  const portfolioContext = JSON.stringify({
    age: userProfile.currentAge,
    retirementAge: userProfile.retirementAge,
    monthlyIncome: userProfile.monthlyIncome,
    assets: assets,
  });

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      portfolioContext,
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm your Boldin AI Advisor. I have access to your financial profile. What would you like to plan today?"
      }
    ]
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isAIPanelOpen) return null;

  return (
    <div className="w-[360px] flex-shrink-0 border-l border-gray-200 bg-white flex flex-col h-[calc(100vh-64px)] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] relative z-20">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Icon name="psychology" className="text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-sm">Boldin AI</h2>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 block"></span> Online
            </p>
          </div>
        </div>
        <button 
          onClick={toggleAIPanel}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
        >
          <Icon name="close" className="text-lg" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-br-sm shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900 placeholder:text-gray-400"
            value={input}
            placeholder="Ask about your retirement..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:hover:bg-primary-600"
          >
            <Icon name="arrow_upward" className="text-lg" />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400">AI can make mistakes. Verify important numbers.</p>
        </div>
      </div>
    </div>
  );
}
