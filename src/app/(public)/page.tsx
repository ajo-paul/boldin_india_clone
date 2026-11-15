import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="trending_up" className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">Boldin India</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Pricing</Link>
            <Link href="#about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">About Us</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/login">
              <Button size="md" className="shadow-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-sm font-semibold text-primary-700 mb-8 shadow-sm">
          <Icon name="workspace_premium" className="text-lg" />
          <span>Tailored specifically for the Indian Market</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] text-gray-900">
          Master Your <span className="text-primary-600">Indian Retirement.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
          The ultimate financial planner that understands EPF, PPF, NPS, and the complexities of Old vs. New Tax Regimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login">
            <Button size="lg" className="text-lg px-10 h-14 shadow-md hover:shadow-lg transition-all">
              Build My Plan for Free
              <Icon name="arrow_forward" className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500 font-medium">Trusted by 10,000+ Indians to optimize their wealth.</p>

        {/* Feature Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 w-full text-left">
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-card hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="pie_chart" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Visual Projections</h3>
            <p className="text-gray-600 leading-relaxed">Interactive charts showing exactly when you can retire and how much corpus you need.</p>
          </div>
          
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-card hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="savings" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Indian Instruments</h3>
            <p className="text-gray-600 leading-relaxed">Native support for EPF compounding, PPF lock-ins, and NPS mandatory annuities.</p>
          </div>
          
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-card hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Icon name="account_balance" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Tax Optimization</h3>
            <p className="text-gray-600 leading-relaxed">Instantly compare the Old vs. New tax regimes to maximize your take-home pay.</p>
          </div>
        </div>
      {/* Pricing Section */}
      <section id="pricing" className="w-full py-24 bg-gray-50 border-t border-gray-200 mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start building your Indian retirement plan today. Upgrade when you need advanced scenarios.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-gray-500 mb-6">Perfect for getting started with your baseline retirement plan.</p>
              <div className="text-5xl font-extrabold text-gray-900 mb-8">
                ₹0<span className="text-lg font-medium text-gray-500">/forever</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-700">
                  <Icon name="check_circle" className="text-primary-600" /> Basic Net Worth Tracking
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Icon name="check_circle" className="text-primary-600" /> Core EPF & PPF Calculators
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Icon name="check_circle" className="text-primary-600" /> Old vs New Tax Regime Basic
                </li>
              </ul>
              <Link href="/login" className="w-full">
                <Button size="lg" variant="outline" className="w-full h-14 border-2">Get Started for Free</Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">Advanced scenario planning and unlimited AI insights for serious wealth building.</p>
              <div className="text-5xl font-extrabold mb-8">
                ₹999<span className="text-lg font-medium text-gray-400">/year</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-300">
                  <Icon name="check_circle" className="text-primary-400" /> Everything in Basic
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Icon name="check_circle" className="text-primary-400" /> Advanced Scenario Manager
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Icon name="check_circle" className="text-primary-400" /> Unlimited AI Financial Assistant
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Icon name="check_circle" className="text-primary-400" /> Custom Goal Projections (House, Education)
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Icon name="check_circle" className="text-primary-400" /> Priority Support & Advisor Booking
                </li>
              </ul>
              <Link href="/login" className="w-full">
                <Button size="lg" className="w-full h-14 bg-primary-600 hover:bg-primary-500 text-white border-none shadow-md">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="trending_up" className="text-gray-400 text-2xl" />
            <span className="text-xl font-bold text-gray-400">Boldin India</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="#" className="hover:text-primary-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-600">Terms of Service</Link>
            <Link href="#" className="hover:text-primary-600">Contact Support</Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Boldin India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
