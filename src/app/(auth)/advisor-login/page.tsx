"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { useState } from "react";

export default function AdvisorLogin() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("email", { email, callbackUrl: "/advisor/portal" });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
        <div className="text-white">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-12">
            <Icon name="trending_up" className="text-primary-400" />
            Boldin India <span className="text-sm font-normal px-2 py-0.5 bg-slate-800 rounded-full ml-2 text-slate-300">For Advisors</span>
          </Link>
          
          <h1 className="text-4xl font-bold tracking-tight mb-6">Grow your practice with pre-qualified clients.</h1>
          <p className="text-lg text-slate-400 mb-8 max-w-md">
            Join the Boldin Network to manage your clients' portfolios directly in our powerful CRM and connect with users seeking SEBI registered advice.
          </p>

          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-3">
              <Icon name="check_circle" className="text-primary-500" /> Secure Document Sharing
            </li>
            <li className="flex items-center gap-3">
              <Icon name="check_circle" className="text-primary-500" /> Scenario Planning Dashboard
            </li>
            <li className="flex items-center gap-3">
              <Icon name="check_circle" className="text-primary-500" /> Custom Booking Engine (.ics)
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center bg-slate-900">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Advisor Access</h2>
          <p className="text-slate-400 mb-8 text-center text-sm">Sign in to your Boldin RIA Dashboard</p>

          <Button 
            variant="outline" 
            fullWidth 
            className="mb-6 bg-white hover:bg-slate-100 text-slate-900 border-none"
            onClick={() => signIn("google", { callbackUrl: "/advisor/portal" })}
          >
            <Icon name="login" className="mr-2" />
            Continue with Google WorkSpace
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Work Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@advisoryfirm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Sending Magic Link..." : "Sign in with Email"}
            </Button>
          </form>

          <p className="text-xs text-center text-slate-500 mt-8">
            By signing in, you agree to our RIA Terms of Service and Privacy Policy. You must hold a valid SEBI registration number to interact with clients.
          </p>
        </div>
      </div>
    </div>
  );
}
