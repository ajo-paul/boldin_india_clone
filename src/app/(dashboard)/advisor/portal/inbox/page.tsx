"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { useState } from "react";

export default function AdvisorInboxPage() {
  const [reply, setReply] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReply("");
    // mock send
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/advisor/portal" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <Icon name="arrow_back" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Secure Inbox</h1>
          <p className="text-gray-500 mt-1">Communicate with your connected clients.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Thread List */}
        <Card className="w-1/3 flex flex-col p-0 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 font-bold text-sm text-slate-500 bg-slate-50 dark:bg-slate-900/50">
            Active Threads
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-primary-50 dark:bg-primary-900/10 cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold">Siddharth Rao</h4>
              <span className="text-xs text-primary-600">10:42 AM</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">Should we execute the mutual fund rebalance?</p>
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold">Priya Kumar</h4>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
            <p className="text-sm text-slate-500 truncate">I've uploaded my Form 16 to the portal.</p>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col p-0 relative">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">SR</div>
              <div>
                <h3 className="font-bold">Siddharth Rao</h3>
                <span className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online</span>
              </div>
            </div>
            <Link href="/advisor/portal/client/123">
              <Button size="sm" variant="outline">View Dashboard</Button>
            </Link>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex flex-col items-start max-w-[80%]">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none text-sm">
                Hi, I was looking at the scenario you built for me yesterday regarding the home downpayment vs NPS.
              </div>
              <span className="text-[10px] text-slate-400 mt-1">10:40 AM</span>
            </div>
            <div className="flex flex-col items-start max-w-[80%]">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none text-sm">
                Should we execute the mutual fund rebalance now or wait for the quarter end?
              </div>
              <span className="text-[10px] text-slate-400 mt-1">10:42 AM</span>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a secure message..."
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <button 
                type="submit"
                disabled={!reply.trim()}
                className="absolute right-2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                <Icon name="send" className="text-sm" />
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
