"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";

interface ProLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function ProLockModal({ isOpen, onClose, featureName }: ProLockModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "mock-user-id", tier: "pro" }),
      });
      const data = await response.json();
      if (data.url) {
        // In a real app, redirect to Stripe
        // window.location.href = data.url;
        alert(`Redirecting to: ${data.url}`);
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <Icon name="close" />
        </button>

        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mb-4">
            <Icon name="workspace_premium" className="text-3xl text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Upgrade to Boldin Pro</h2>
          <p className="text-slate-500">
            {featureName} is an exclusive feature for Pro members. 
            Upgrade today to unlock the full potential of your financial plan.
          </p>
        </div>

        <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <Icon name="check_circle" className="text-primary-500 text-base" />
            Unlimited Tax Scenarios (Old vs New)
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check_circle" className="text-primary-500 text-base" />
            Peer Comparison Analytics
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check_circle" className="text-primary-500 text-base" />
            2 Free Advisor Consultations/Year
          </li>
        </ul>

        <div className="flex flex-col gap-3">
          <Button variant="primary" fullWidth onClick={handleUpgrade} disabled={isLoading}>
            {isLoading ? "Redirecting..." : "Upgrade for ₹2499/year"}
          </Button>
          <Button variant="ghost" fullWidth onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}
