"use client";

import { usePortfolioStore } from '@/store/portfolioStore';
import { Icon } from '@/components/ui/Icon';

export function FloatingAIToggle() {
  const isAIPanelOpen = usePortfolioStore((state) => state.isAIPanelOpen);
  const toggleAIPanel = usePortfolioStore((state) => state.toggleAIPanel);

  if (isAIPanelOpen) return null;

  return (
    <button
      onClick={toggleAIPanel}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-primary-500 transition-all duration-300 flex items-center justify-center z-50 group"
      aria-label="Open AI Assistant"
    >
      <Icon name="psychology" className="text-2xl group-hover:scale-110 transition-transform" />
      {/* Notification Dot */}
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
      </span>
    </button>
  );
}
