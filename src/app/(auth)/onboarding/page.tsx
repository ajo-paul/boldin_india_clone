"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  const [age, setAge] = useState<number>(30);
  const [income, setIncome] = useState<number>(150000);
  const [targetAge, setTargetAge] = useState<number>(60);
  
  const setUserProfile = usePortfolioStore((state) => state.setUserProfile);

  const handleNext = () => {
    if (step === 3) {
      setUserProfile({
        currentAge: age,
        retirementAge: targetAge,
        monthlyIncome: income,
      });
      router.push("/overview");
      return;
    }

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setStep(step + 1);
      });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary-50 -skew-y-3 transform origin-top-left -z-10" />

      <Card className="w-full max-w-lg p-10 shadow-card border-none rounded-3xl bg-white relative">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Icon name="trending_up" className="text-primary-600 text-2xl" />
            <span className="font-bold text-gray-900">Boldin India</span>
          </div>
          <div className="text-sm font-semibold text-gray-400">Step {step} of 3</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-10 overflow-hidden">
          <div 
            className="bg-primary-600 h-full rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Welcome to Boldin!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We are excited to help you plan your Indian retirement. Let's start with a few quick questions to personalize your dashboard.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What is your current age?</label>
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Your Baseline</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              To project your wealth, we need a rough idea of your current monthly income and target retirement age.
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                <input 
                  type="number" 
                  value={income} 
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Retirement Age</label>
                <input 
                  type="number" 
                  value={targetAge} 
                  onChange={(e) => setTargetAge(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-6">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="check_circle" className="text-5xl text-primary-600" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">You're all set!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We've created your personalized retirement planner. Let's dive in and start adding your EPF, PPF, and Mutual Fund accounts.
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <Button onClick={handleNext} className="px-8 h-12 text-base font-semibold shadow-md">
            {step === 3 ? "Go to Dashboard" : "Continue"}
            <Icon name="arrow_forward" className="ml-2 text-sm" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
