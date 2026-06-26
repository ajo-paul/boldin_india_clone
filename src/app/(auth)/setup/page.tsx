"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export default function PostSignupSetup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    age: "",
    retirementAge: "60",
    currentSavings: "",
    riskTolerance: "moderate"
  });

  useEffect(() => {
    // Load pre-signup data from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("boldin_hook_data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse hook data");
        }
      }
    }
  }, []);

  const handleSaveAndContinue = async () => {
    setIsSubmitting(true);
    // Here we would typically call a server action or API to save the profile to Supabase
    // await createProfile(data);
    
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("boldin_hook_data");
    }
    
    // Simulate network delay
    setTimeout(() => {
      router.push("/overview");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center mb-8">
        <Icon name="check_circle" className="text-primary-500 text-5xl mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Account Created!</h1>
        <p className="text-gray-500 mt-2">Let's confirm a few details to generate your master dashboard.</p>
      </div>

      <Card className="w-full max-w-2xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Current Age</label>
            <input 
              type="number" 
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Retirement Age</label>
            <input 
              type="number" 
              value={data.retirementAge}
              onChange={(e) => setData({ ...data, retirementAge: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Initial Corpus (₹)</label>
            <input 
              type="number" 
              value={data.currentSavings}
              onChange={(e) => setData({ ...data, currentSavings: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Risk Tolerance</label>
            <select 
              value={data.riskTolerance}
              onChange={(e) => setData({ ...data, riskTolerance: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="conservative">Conservative (FDs, PPF)</option>
              <option value="moderate">Moderate (Balanced MFs)</option>
              <option value="aggressive">Aggressive (Pure Equity)</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
          <Button 
            variant="primary" 
            onClick={handleSaveAndContinue}
            disabled={isSubmitting || !data.age}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Icon name="refresh" className="animate-spin mr-2" />
                Generating Plan...
              </>
            ) : "Go to Dashboard"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
