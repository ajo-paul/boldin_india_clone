"use client";

import { Icon } from "@/components/ui/Icon";

export function Topnav() {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-slate-800 bg-card/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 text-gray-500">
        <h2 className="text-lg font-semibold text-foreground">Welcome Back, User</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-foreground transition-colors">
          <Icon name="notifications" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-negative rounded-full"></span>
        </button>
        <button className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
          JD
        </button>
      </div>
    </header>
  );
}
