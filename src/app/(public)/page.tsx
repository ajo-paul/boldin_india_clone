import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Icon name="trending_up" className="text-primary-400 text-3xl" />
          <span className="text-2xl font-bold tracking-tight">Boldin India</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
            Log in
          </Link>
          <Link href="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-primary-300 mb-8">
          <Icon name="workspace_premium" className="text-lg" />
          <span>Tailored specifically for the Indian Market</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Master Your <span className="text-primary-400">Indian Retirement.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed">
          The ultimate financial planner that understands EPF, PPF, NPS, and the complexities of Old vs. New Tax Regimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login">
            <Button size="lg" className="text-lg px-10">
              Build My Plan for Free
              <Icon name="arrow_forward" className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-slate-500">Trusted by 10,000+ Indians to optimize their wealth.</p>

        {/* Feature Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-primary-900/50 text-primary-400 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="pie_chart" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visual Projections</h3>
            <p className="text-slate-400 leading-relaxed">Interactive charts showing exactly when you can retire and how much corpus you need.</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-primary-900/50 text-primary-400 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="savings" />
            </div>
            <h3 className="text-xl font-bold mb-3">Indian Instruments</h3>
            <p className="text-slate-400 leading-relaxed">Native support for EPF compounding, PPF lock-ins, and NPS mandatory annuities.</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-primary-900/50 text-primary-400 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="account_balance" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tax Optimization</h3>
            <p className="text-slate-400 leading-relaxed">Instantly compare the Old vs. New tax regimes to maximize your take-home pay.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
