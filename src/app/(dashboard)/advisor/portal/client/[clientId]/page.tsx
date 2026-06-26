"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { use } from "react";

export default function ClientSharedDashboard({ params }: { params: Promise<{ clientId: string }> }) {
  // Mock data for the specific client
  const { clientId } = use(params);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/advisor/portal" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <Icon name="arrow_back" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Portfolio</h1>
          <p className="text-gray-500 mt-1">Viewing read-only dashboard for Client #{clientId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Net Worth Overview</h2>
              <span className="text-2xl font-black text-primary-600 dark:text-primary-400">₹45.2L</span>
            </div>
            
            <div className="h-64 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400">
              <Icon name="monitoring" className="text-4xl mb-2 text-slate-300 dark:text-slate-700" />
              <p>Area Chart Simulation</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Actionable Scenarios</h2>
              <Button size="sm" variant="outline">
                <Icon name="add" className="mr-2" /> New Scenario
              </Button>
            </div>
            
            <div className="p-4 rounded-xl border border-primary-200 dark:border-primary-900/50 bg-primary-50 dark:bg-primary-900/20">
              <h3 className="font-bold mb-1">Tax Regime Switch Recommendation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Based on current 80C declarations, switching to the New Tax Regime saves ₹45,000 annually.</p>
              <Button size="sm" variant="primary">Push to Client</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white dark:bg-slate-800 border border-slate-800">
            <h3 className="font-bold mb-4 border-b border-slate-700 pb-2">Asset Allocation</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Equity</span>
                <span className="font-bold text-sm">65%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Debt (EPF/PPF)</span>
                <span className="font-bold text-sm">30%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Cash</span>
                <span className="font-bold text-sm">5%</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
