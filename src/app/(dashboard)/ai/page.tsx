"use client";

import { useChat } from 'ai/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AIPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Financial Assistant</h1>
        <p className="text-gray-500 mt-1">Ask questions about your portfolio, Indian tax laws, or retirement strategies.</p>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden relative shadow-xl">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Icon name="smart_toy" className="text-6xl mb-4 text-primary-200 dark:text-primary-900" />
              <p>Hi! I'm your Boldin AI Assistant.</p>
              <p className="text-sm mt-2">Try asking: "Should I switch to the new tax regime?"</p>
            </div>
          )}
          
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-bl-none text-slate-800 dark:text-slate-200'
                }`}
              >
                {m.role !== 'user' && (
                  <div className="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
                    <Icon name="smart_toy" className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-wider">Boldin AI</span>
                  </div>
                )}
                <div className={`prose ${m.role === 'user' ? 'prose-invert' : 'dark:prose-invert'} prose-sm max-w-none`}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything about your finances..."
              className="w-full pl-4 pr-14 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 w-10 h-10 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="send" className="text-sm" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Powered by Google Gemini</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
