"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore, PortfolioAsset } from "@/store/portfolioStore";

export function StoreProvider({
  initialPortfolios,
  children
}: {
  initialPortfolios: PortfolioAsset[];
  children: React.ReactNode;
}) {
  const isHydrated = usePortfolioStore((state) => state.isHydrated);
  const setAssets = usePortfolioStore((state) => state.setAssets);
  const setHydrated = usePortfolioStore((state) => state.setHydrated);
  
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!hasHydrated.current) {
      setAssets(initialPortfolios);
      setHydrated(true);
      hasHydrated.current = true;
    }
  }, [initialPortfolios, setAssets, setHydrated]);

  return <>{children}</>;
}
