"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

export default function OnboardingHook() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    age: "",
    retirementAge: "60",
    currentSavings: "",
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else finishHook();
  };

  const finishHook = () => {
    // Save to localStorage so it can be picked up after login
    if (typeof window !== "undefined") {
      localStorage.setItem("boldin_hook_data", JSON.stringify(data));
    }
    router.push("/login?redirect=/setup");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6 text-white">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Icon name="trending_up" className="text-primary-400" />
          Boldin India
        </Link>
      </div>

      <Card className="w-full max-w-lg p-8 sm:p-10 bg-slate-900 border border-slate-800 text-white shadow-2xl">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-primary-500' : 'bg-slate-800'}`}
              />
            ))}
          </div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold mb-2">Let's build your plan.</h2>
              <p className="text-slate-400 mb-6">First, how old are you?</p>
              <input 
                type="number" 
                autoFocus
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                className="w-full h-14 px-4 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-lg"
                placeholder="e.g. 32"
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold mb-2">Target timeline.</h2>
              <p className="text-slate-400 mb-6">When do you plan to retire?</p>
              <input 
                type="number" 
                autoFocus
                value={data.retirementAge}
                onChange={(e) => setData({ ...data, retirementAge: e.target.value })}
                className="w-full h-14 px-4 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-lg"
                placeholder="60"
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold mb-2">Starting point.</h2>
              <p className="text-slate-400 mb-6">What are your total current savings? (EPF, PPF, Mutual Funds)</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  type="number" 
                  autoFocus
                  value={data.currentSavings}
                  onChange={(e) => setData({ ...data, currentSavings: e.target.value })}
                  className="w-full h-14 pl-10 pr-4 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-lg"
                  placeholder="e.g. 500000"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-slate-300 hover:text-white hover:bg-slate-800">
              Back
            </Button>
          )}
          <Button 
            variant="primary" 
            fullWidth 
            onClick={nextStep}
            disabled={(step === 1 && !data.age) || (step === 2 && !data.retirementAge) || (step === 3 && !data.currentSavings)}
          >
            {step === 3 ? "See My Projection" : "Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
