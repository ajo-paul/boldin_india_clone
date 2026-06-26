"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useState } from "react";
import Link from "next/link";

export default function AdvisorPortalPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    setTimeout(() => {
      alert(`Invite sent to ${inviteEmail}!`);
      setInviteEmail("");
      setIsInviting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advisor CRM & Inbox</h1>
          <p className="text-gray-500 mt-1">Manage your pending consultations and active clients.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/advisor/portal/inbox">
            <Button variant="outline" className="border-slate-200 dark:border-slate-800">
              <Icon name="inbox" className="mr-2" /> Inbox
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Pending Requests */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <Icon name="event" className="text-primary-600 text-2xl" />
              <h2 className="text-xl font-bold">Booking Requests</h2>
            </div>
            
            <div className="space-y-4">
              {/* Request Item */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-800">
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg">Aarav Patel</h3>
                  <p className="text-sm text-gray-500">Topic: Old vs New Tax Regime Analysis</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Requested for: Tomorrow, 2:00 PM</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-negative text-negative hover:bg-negative-50">Decline</Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-800">
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg">Neha Gupta</h3>
                  <p className="text-sm text-gray-500">Topic: NPS Tier 1 Setup</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Requested for: June 28, 10:00 AM</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-negative text-negative hover:bg-negative-50">Decline</Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Active Clients & Invites */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white dark:bg-slate-800 border border-slate-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="person_add" className="text-primary-400" /> Invite Client
            </h3>
            <p className="text-sm text-slate-400 mb-4">Send a secure link to connect with an existing Boldin user.</p>
            <form onSubmit={handleInvite} className="flex gap-2">
              <input 
                type="email" 
                placeholder="client@email.com" 
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:outline-none focus:border-primary-500"
              />
              <Button type="submit" size="sm" disabled={isInviting}>
                {isInviting ? "Sending..." : "Invite"}
              </Button>
            </form>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="bar_chart" className="text-primary-600 dark:text-primary-400" /> Active Clients
            </h3>
            
            <div className="space-y-4">
              <Link href="/advisor/portal/client/123" className="block group">
                <div className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-sm font-bold border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300">SR</div>
                    <div>
                      <p className="font-medium text-sm">Siddharth Rao</p>
                      <p className="text-xs text-slate-500">View Shared Dashboard</p>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </Link>

              <Link href="/advisor/portal/client/456" className="block group">
                <div className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-sm font-bold border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300">PK</div>
                    <div>
                      <p className="font-medium text-sm">Priya Kumar</p>
                      <p className="text-xs text-slate-500">View Shared Dashboard</p>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </Link>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
