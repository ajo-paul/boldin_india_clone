import { create } from 'zustand';

export interface PortfolioAsset {
  id?: string;
  asset_class: 'EPF' | 'PPF' | 'NPS' | 'MUTUAL_FUND' | 'FD' | string;
  institution_name: string;
  current_value: number;
  monthly_contribution: number;
}

export interface UserProfile {
  currentAge: number;
  retirementAge: number;
  monthlyIncome: number;
}

interface PortfolioState {
  assets: PortfolioAsset[];
  userProfile: UserProfile;
  isHydrated: boolean;
  isAIPanelOpen: boolean;
  setAssets: (assets: PortfolioAsset[]) => void;
  addAsset: (asset: PortfolioAsset) => void;
  removeAsset: (id: string) => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setHydrated: (state: boolean) => void;
  toggleAIPanel: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [],
  userProfile: {
    currentAge: 30,
    retirementAge: 60,
    monthlyIncome: 150000,
  },
  isHydrated: false,
  isAIPanelOpen: false,
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter((a) => a.id !== id)
  })),
  setUserProfile: (profile) => set((state) => ({
    userProfile: { ...state.userProfile, ...profile }
  })),
  setHydrated: (isHydrated) => set({ isHydrated }),
  toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
}));
