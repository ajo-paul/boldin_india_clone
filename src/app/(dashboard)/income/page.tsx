"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { addPortfolioAsset } from "@/actions/portfolio";
import { useState } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";

function getAssetIcon(assetClass: string) {
  switch (assetClass) {
    case 'EPF':
    case 'PPF':
      return { name: 'assured_workload', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900' };
    case 'MUTUAL_FUND':
      return { name: 'candlestick_chart', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900' };
    case 'NPS':
      return { name: 'account_balance', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900' };
    default:
      return { name: 'savings', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900' };
  }
}

export default function IncomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const assets = usePortfolioStore((state) => state.assets);
  const addAsset = usePortfolioStore((state) => state.addAsset);
  const isHydrated = usePortfolioStore((state) => state.isHydrated);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    // Optimistic update
    const newAsset = {
      id: Math.random().toString(), // temporary ID
      asset_class: formData.get("asset_class") as string,
      institution_name: formData.get("institution_name") as string,
      current_value: parseFloat(formData.get("current_value") as string),
      monthly_contribution: parseFloat(formData.get("monthly_contribution") as string) || 0,
    };
    addAsset(newAsset);

    const res = await addPortfolioAsset(formData);
    setIsSubmitting(false);
    
    if (res.error) {
      alert("Failed to save asset");
    } else {
      // In a real app we'd reset the form properly, for demo we rely on standard action behavior
      const form = document.getElementById("asset-form") as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Income & Savings</h1>
        <p className="text-gray-500 mt-1">Manage your active income streams and investment portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <Icon name="work" className="text-primary-600 text-2xl" />
              <h2 className="text-xl font-bold">Primary Income</h2>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Basic Salary (₹)</label>
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. 1200000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Allowances (₹)</label>
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. 300000" />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary">Update Salary</Button>
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <Icon name="account_balance" className="text-primary-600 text-2xl" />
              <h2 className="text-xl font-bold">Add Manual Asset</h2>
            </div>
            
            <form id="asset-form" action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Asset Class</label>
                  <select name="asset_class" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900">
                    <option value="EPF">EPF (Employee Provident Fund)</option>
                    <option value="PPF">PPF (Public Provident Fund)</option>
                    <option value="NPS">NPS (National Pension System)</option>
                    <option value="MUTUAL_FUND">Mutual Fund (Equity/Debt)</option>
                    <option value="FD">Fixed Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Institution Name</label>
                  <input name="institution_name" type="text" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. EPFO, SBI, Zerodha" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Value (₹)</label>
                  <input name="current_value" type="number" required className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Contribution (₹)</label>
                  <input name="monthly_contribution" type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="0" />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Asset"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Existing Assets */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white dark:bg-slate-800 border border-slate-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="mail" className="text-primary-400" /> Auto-Sync Magic Link
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Forward your CAMS/KFintech CAS statement to your secure magic email to auto-sync mutual funds.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-700 text-xs font-mono text-center overflow-x-auto">
              sync-uid829@inbound.boldin.in
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4">Your Portfolio</h3>
            
            <div className="space-y-4">
              {!isHydrated ? (
                <div className="text-center py-4 text-gray-400 animate-pulse">Loading...</div>
              ) : assets.length === 0 ? (
                <div className="text-center py-4 text-gray-400">No assets found.</div>
              ) : (
                assets.map((asset, i) => {
                  const iconStyle = getAssetIcon(asset.asset_class);
                  return (
                    <div key={asset.id || i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${iconStyle.bg} flex items-center justify-center ${iconStyle.color}`}>
                          <Icon name={iconStyle.name} />
                        </div>
                        <div>
                          <p className="font-medium">{asset.asset_class} Balance</p>
                          <p className="text-xs text-gray-500">{asset.institution_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{asset.current_value.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
