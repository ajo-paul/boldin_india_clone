import { create } from 'zustand';

export interface PortfolioAsset {
  id?: string;
  asset_class: 'EPF' | 'PPF' | 'NPS' | 'MUTUAL_FUND' | 'FD' | string;
  institution_name: string;
  current_value: number;
  monthly_contribution: number;
}

interface PortfolioState {
  assets: PortfolioAsset[];
  isHydrated: boolean;
  setAssets: (assets: PortfolioAsset[]) => void;
  addAsset: (asset: PortfolioAsset) => void;
  removeAsset: (id: string) => void;
  setHydrated: (state: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [],
  isHydrated: false,
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter((a) => a.id !== id)
  })),
  setHydrated: (isHydrated) => set({ isHydrated }),
}));
