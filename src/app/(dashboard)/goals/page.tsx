"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function GoalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expenses & Goals</h1>
        <p className="text-gray-500 mt-1">Define your living costs and what you are saving for.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <Icon name="receipt_long" className="text-negative text-2xl" />
              <h2 className="text-xl font-bold">Monthly Living Expenses</h2>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Monthly Expense (₹)</label>
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. 50000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expected Inflation (%)</label>
                  <input type="number" step="0.1" defaultValue="6.0" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This is used to calculate the Future Value of your expenses in retirement.
              </p>
              <div className="pt-2">
                <Button variant="primary">Update Expenses</Button>
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <Icon name="flag" className="text-primary-600 text-2xl" />
              <h2 className="text-xl font-bold">Add Future Goal</h2>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Name</label>
                  <input type="text" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. Child's Education" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Year</label>
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="2035" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Estimated Cost in Today's Value (₹)</label>
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900" placeholder="e.g. 2500000" />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary">Add Goal</Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Existing Goals */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold mb-4">Your Timeline</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-500 group-[.is-active]:bg-primary-100 group-[.is-active]:text-primary-600 dark:group-[.is-active]:bg-primary-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Icon name="home" className="text-sm" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100">House Downpayment</div>
                    <time className="font-medium text-primary-500">2029</time>
                  </div>
                  <div className="text-slate-500 text-sm">₹25,00,000 (Adjusted: ₹30L)</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-500 group-[.is-active]:bg-primary-100 group-[.is-active]:text-primary-600 dark:group-[.is-active]:bg-primary-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Icon name="beach_access" className="text-sm" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Retirement</div>
                    <time className="font-medium text-primary-500">2054</time>
                  </div>
                  <div className="text-slate-500 text-sm">Target Corpus: ₹4.2 Cr</div>
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
