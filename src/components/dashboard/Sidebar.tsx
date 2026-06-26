"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Overview", href: "/overview", icon: "dashboard" },
  { name: "Income & Savings", href: "/income", icon: "account_balance_wallet" },
  { name: "Expenses & Goals", href: "/goals", icon: "track_changes" },
  { name: "Tax Engine", href: "/tax", icon: "receipt_long" },
  { name: "AI Assistant", href: "/ai", icon: "smart_toy" },
  { name: 'Advisors', href: '/advisor', icon: 'support_agent' },
  { name: 'Marketplace', href: '/marketplace', icon: 'storefront' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-slate-800 bg-card text-card-foreground flex flex-col h-screen fixed top-0 left-0">
      <div className="p-6">
        <Link href="/overview" className="flex items-center gap-2 font-bold text-xl">
          <Icon name="trending_up" className="text-primary-600" />
          Boldin India
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive 
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
              }`}
            >
              <Icon name={item.icon} className={isActive ? "" : "text-gray-400 dark:text-gray-500"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-colors font-medium text-gray-600 hover:bg-negative-50 hover:text-negative-600 dark:text-gray-400 dark:hover:bg-negative-900/30 dark:hover:text-negative-400"
        >
          <Icon name="logout" className="text-gray-400 dark:text-gray-500 group-hover:text-negative-500" />
          Log out
        </button>
      </div>
    </aside>
  );
}
