"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useState } from "react";

const mockAdvisors = [
  {
    id: 1,
    name: "Ramesh Iyer",
    specialty: "Tax Optimization & EPF",
    hourlyRate: 2000,
    rating: 4.9,
    bio: "Ex-KPMG director specializing in Old vs New regime mapping.",
    initials: "RI",
  },
  {
    id: 2,
    name: "Anita Sharma",
    specialty: "Mutual Funds & Goal Planning",
    hourlyRate: 1500,
    rating: 4.8,
    bio: "Certified Financial Planner with 15 years experience in wealth management.",
    initials: "AS",
  },
  {
    id: 3,
    name: "Vikram Singh",
    specialty: "Retirement Annuities & NPS",
    hourlyRate: 1800,
    rating: 4.7,
    bio: "NPS expert. Helps you structure your withdrawals efficiently.",
    initials: "VS",
  }
];

export default function AdvisorPage() {
  const [bookingId, setBookingId] = useState<number | null>(null);

  const handleBook = (id: number) => {
    setBookingId(id);
    setTimeout(() => {
      alert("Consultation booked! Check your email for the meeting link.");
      setBookingId(null);
    }, 1500);
  };

  const handleUpgrade = async () => {
    // In a real app, this redirects to a Stripe Checkout Session
    alert("Redirecting to Stripe Checkout...");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advisor Marketplace</h1>
          <p className="text-gray-500 mt-1">Connect with certified SEBI Registered Investment Advisors (RIAs).</p>
        </div>
        <div className="flex flex-col items-end">
          <Button variant="outline" className="text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800" onClick={handleUpgrade}>
            <Icon name="workspace_premium" className="mr-2 text-sm" />
            Upgrade to Pro
          </Button>
          <span className="text-xs text-gray-400 mt-2">Get 2 free consultations/year</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAdvisors.map(advisor => (
          <Card key={advisor.id} className="flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xl shrink-0">
                {advisor.initials}
              </div>
              <div>
                <h3 className="font-bold text-lg">{advisor.name}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{advisor.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                  <Icon name="star" className="text-amber-400 text-sm" />
                  <span>{advisor.rating} Rating</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">
              "{advisor.bio}"
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
              <span className="font-bold">₹{advisor.hourlyRate} <span className="text-gray-400 font-normal text-sm">/ hr</span></span>
              <Button 
                size="sm" 
                onClick={() => handleBook(advisor.id)}
                disabled={bookingId === advisor.id}
              >
                {bookingId === advisor.id ? "Booking..." : "Book Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Advisor Portal Call to Action */}
      <Card className="bg-slate-900 text-white dark:bg-slate-800 border border-slate-800 mt-12 text-center p-12">
        <Icon name="handshake" className="text-5xl text-primary-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Are you a Certified Advisor?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
          Join the Boldin network to get access to pre-qualified leads and a dedicated CRM to manage your clients' portfolios.
        </p>
        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
          Apply to Join Network
        </Button>
      </Card>
    </div>
  );
}
