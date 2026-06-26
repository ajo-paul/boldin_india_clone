"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function MarketplacePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace Hub</h1>
        <p className="text-gray-500 mt-1">Curated financial products to help you execute your plan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Insurance Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="health_and_safety" className="text-2xl text-primary-600" />
            <h2 className="text-2xl font-bold">Insurance</h2>
          </div>
          
          <Card className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold">Term Life Insurance</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Protect your family's future with pure protection term plans starting at ₹499/month.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li className="flex items-center gap-2"><Icon name="check" className="text-primary-500 text-sm" /> 100% payout guarantee</li>
                <li className="flex items-center gap-2"><Icon name="check" className="text-primary-500 text-sm" /> Section 80C tax benefits</li>
              </ul>
              <Button>Compare Plans</Button>
            </div>
            <div className="w-full sm:w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Icon name="shield" className="text-5xl text-slate-300 dark:text-slate-600" />
            </div>
          </Card>

          <Card className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold">Health Insurance</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Comprehensive medical cover for you and your family.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li className="flex items-center gap-2"><Icon name="check" className="text-primary-500 text-sm" /> Cashless network hospitals</li>
                <li className="flex items-center gap-2"><Icon name="check" className="text-primary-500 text-sm" /> Section 80D tax benefits</li>
              </ul>
              <Button>Get a Quote</Button>
            </div>
            <div className="w-full sm:w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Icon name="medical_services" className="text-5xl text-slate-300 dark:text-slate-600" />
            </div>
          </Card>
        </div>

        {/* Wealth & Tax Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="account_balance" className="text-2xl text-primary-600" />
            <h2 className="text-2xl font-bold">Wealth & Tax</h2>
          </div>

          <Card className="flex flex-col sm:flex-row gap-6 p-6 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-slate-900 border-primary-100 dark:border-primary-900/50">
            <div className="flex-1">
              <div className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-bold rounded mb-2">ZERO COMMISSIONS</div>
              <h3 className="text-lg font-bold">Direct Mutual Funds</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Execute your investment plan with zero-commission direct mutual funds via our flat-fee platform.</p>
              <Button variant="primary">Start Investing</Button>
            </div>
            <div className="w-full sm:w-32 h-32 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="trending_up" className="text-5xl text-primary-300 dark:text-primary-700" />
            </div>
          </Card>

          <Card className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold">Tax Filing Service</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Seamless ITR filing by certified CAs. Auto-import your capital gains and Form 16.</p>
              <Button variant="outline">File ITR Now</Button>
            </div>
            <div className="w-full sm:w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Icon name="receipt_long" className="text-5xl text-slate-300 dark:text-slate-600" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
