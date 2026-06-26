"use client";

import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { projectPPF } from "@/lib/financial-engine/calculators/ppf";
import { projectEPF } from "@/lib/financial-engine/calculators/epf";
import { projectNPS } from "@/lib/financial-engine/calculators/nps";
import { getFinancialRulesSync } from "@/lib/financial-engine/rules";

const rules = getFinancialRulesSync();

export default function OverviewPage() {
  const assets = usePortfolioStore((state) => state.assets);
  const isHydrated = usePortfolioStore((state) => state.isHydrated);

  const { chartData, currentNetWorth } = useMemo(() => {
    let currentNW = 0;
    const aggregatedProjections: Record<number, { wealth: number; target: number }> = {};
    const CURRENT_AGE = 30; // Hardcoded for demo, would come from user profile
    const RETIREMENT_AGE = 60;
    
    // Initialize aggregated projections
    for (let age = CURRENT_AGE; age <= RETIREMENT_AGE; age++) {
      aggregatedProjections[age] = { wealth: 0, target: 0 };
    }

    if (!isHydrated || assets.length === 0) {
      // Return empty chart or default structure if no assets
      return { 
        chartData: Object.entries(aggregatedProjections).map(([age, data]) => ({ age: Number(age), ...data })), 
        currentNetWorth: 0 
      };
    }

    assets.forEach(asset => {
      currentNW += asset.current_value;
      const yearsToProject = RETIREMENT_AGE - CURRENT_AGE;
      
      let projection = [];

      switch(asset.asset_class) {
        case 'PPF':
          projection = projectPPF({
            currentBalance: asset.current_value,
            annualDeposit: asset.monthly_contribution * 12,
            yearsToProject
          }, rules);
          break;
        case 'EPF':
          projection = projectEPF({
            currentBalance: asset.current_value,
            basicSalaryAnnual: asset.monthly_contribution * 12 * 8.33, // Rough back-calculation for demo
            yearsToProject,
            salaryGrowthRate: 0.1
          }, rules);
          break;
        case 'NPS':
          const npsResult = projectNPS({
            currentBalance: asset.current_value,
            annualDeposit: asset.monthly_contribution * 12,
            yearsToProject,
            expectedReturnRate: 0.10 // Default 10% for NPS
          }, rules, CURRENT_AGE);
          projection = npsResult.projection;
          break;
        case 'MUTUAL_FUND':
        case 'FD':
        default:
          // Generic compounder for other assets
          const rate = asset.asset_class === 'FD' ? 0.065 : 0.12;
          let balance = asset.current_value;
          for(let y = 1; y <= yearsToProject; y++) {
            const deposit = asset.monthly_contribution * 12;
            const interest = (balance * rate) + (deposit * rate) / 2;
            balance = balance + deposit + interest;
            projection.push({
              year: y,
              age: CURRENT_AGE + y,
              closingBalance: balance
            });
          }
          break;
      }

      // Add to aggregated
      // Year 0 (current age)
      aggregatedProjections[CURRENT_AGE].wealth += asset.current_value;
      
      // Future years
      projection.forEach(p => {
        if (p.age && p.age <= RETIREMENT_AGE) {
          aggregatedProjections[p.age].wealth += p.closingBalance;
        }
      });
    });

    // Calculate a dummy target
    let target = currentNW || 1500000;
    for (let age = CURRENT_AGE; age <= RETIREMENT_AGE; age++) {
      aggregatedProjections[age].target = Math.round(target);
      target = target * 1.0825 + 320000;
    }

    const dataArray = Object.entries(aggregatedProjections).map(([age, data]) => ({
      age: Number(age),
      wealth: Math.round(data.wealth),
      target: Math.round(data.target)
    }));

    return { chartData: dataArray, currentNetWorth: currentNW };
  }, [assets, isHydrated]);

  const targetCorpus = chartData.length > 0 ? chartData[chartData.length - 1].target : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Financial Overview</h1>
          <p className="text-gray-500 mt-1">Here is how your Indian retirement is shaping up.</p>
        </div>
        <div className="flex items-center gap-3 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full border border-primary-100 dark:border-primary-800 font-medium">
          <Icon name="workspace_premium" />
          Retirement Score: {currentNetWorth > 0 ? '82/100' : '0/100'}
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Icon name="account_balance_wallet" className="text-lg" />
            <h3 className="font-medium">Current Net Worth</h3>
          </div>
          <span className="text-4xl font-bold">₹{(currentNetWorth / 100000).toFixed(2)}L</span>
          <div className="mt-4 flex items-center text-sm text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 w-max px-2 py-1 rounded">
            <Icon name="trending_up" className="text-sm mr-1" />
            +12% this year
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Icon name="flag" className="text-lg" />
            <h3 className="font-medium">Target Corpus (Age 60)</h3>
          </div>
          <span className="text-4xl font-bold">₹{(targetCorpus / 10000000).toFixed(2)} Cr</span>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            Inflation adjusted at 6%
          </div>
        </Card>

        <Card className="flex flex-col bg-slate-900 text-white dark:bg-slate-800 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Icon name="tips_and_updates" className="text-lg" />
            <h3 className="font-medium">Action Item</h3>
          </div>
          <p className="text-lg font-medium leading-snug">
            You can save <span className="text-primary-400">₹45,000 more</span> by switching to the New Tax Regime.
          </p>
          <button className="mt-auto pt-4 text-sm text-primary-400 hover:text-primary-300 font-medium text-left flex items-center">
            Review Tax Setup <Icon name="arrow_forward" className="text-sm ml-1" />
          </button>
        </Card>
      </div>

      {/* Main Chart Area */}
      <Card className="h-[500px] flex flex-col">
        <h3 className="text-xl font-bold mb-6">Wealth Projection</h3>
        <div className="flex-1 w-full min-h-0">
          {chartData.length > 0 && chartData[0].wealth > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="age" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b' }} 
                  dy={10}
                  tickFormatter={(value) => `Age ${value}`}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b' }} 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)' }}
                  formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)} Lakhs`, '']}
                  labelFormatter={(label) => `At Age ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="wealth" 
                  name="Projected Wealth"
                  stroke="#16a34a" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorWealth)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  name="Target Wealth"
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-2">
              <Icon name="show_chart" className="text-4xl text-gray-300" />
              <p>Add assets in the Income & Savings page to see your projection.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Gamification / Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex items-start gap-4 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-slate-900 border border-primary-100 dark:border-primary-900">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-2xl">
            🎉
          </div>
          <div>
            <h4 className="font-bold text-lg">Milestone Reached!</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">You crossed ₹10 Lakhs in Mutual Funds. You are in the top 15% of your age bracket in Bangalore.</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center shadow-sm">
            <Icon name="military_tech" className="text-2xl" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Tax Optimizer Badge</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Earned for successfully mapping out Old vs New regime limits.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
