import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topnav } from "@/components/dashboard/Topnav";
import { createClient } from "@/utils/supabase/server";
import { StoreProvider } from "@/components/dashboard/StoreProvider";
import { PortfolioAsset } from "@/store/portfolioStore";

import { AIAssistantPanel } from "@/components/dashboard/AIAssistantPanel";
import { FloatingAIToggle } from "@/components/dashboard/FloatingAIToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let initialPortfolios: PortfolioAsset[] = [];
  
  if (user) {
    const { data } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id);
      
    if (data) {
      initialPortfolios = data as PortfolioAsset[];
    }
  }

  return (
    <StoreProvider initialPortfolios={initialPortfolios}>
      <div className="flex h-screen bg-background overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden transition-all duration-300">
          <Topnav />
          <main className="flex-1 overflow-y-auto p-8 relative">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
            <FloatingAIToggle />
          </main>
        </div>
        <AIAssistantPanel />
      </div>
    </StoreProvider>
  );
}
