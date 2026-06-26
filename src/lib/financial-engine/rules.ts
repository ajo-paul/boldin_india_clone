import { FinancialRules } from './types';

// Default static rules for FY 2024-2025 (AY 2025-2026)
export const DEFAULT_RULES: FinancialRules = {
  tax: {
    oldRegime: {
      slabs: {
        general: [
          { min: 0, max: 250000, rate: 0 },
          { min: 250000, max: 500000, rate: 0.05 },
          { min: 500000, max: 1000000, rate: 0.2 },
          { min: 1000000, max: null, rate: 0.3 },
        ],
        senior: [
          { min: 0, max: 300000, rate: 0 },
          { min: 300000, max: 500000, rate: 0.05 },
          { min: 500000, max: 1000000, rate: 0.2 },
          { min: 1000000, max: null, rate: 0.3 },
        ],
        superSenior: [
          { min: 0, max: 500000, rate: 0 },
          { min: 500000, max: 1000000, rate: 0.2 },
          { min: 1000000, max: null, rate: 0.3 },
        ],
      },
      rebateLimit: 500000, // Section 87A
      standardDeduction: 50000,
      cessRate: 0.04,
      surcharge: [
        { threshold: 5000000, rate: 0.1 },
        { threshold: 10000000, rate: 0.15 },
        { threshold: 20000000, rate: 0.25 },
        { threshold: 50000000, rate: 0.37 },
      ],
    },
    newRegime: {
      // Latest slabs as of Budget 2024
      slabs: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 700000, rate: 0.05 },
        { min: 700000, max: 1000000, rate: 0.1 },
        { min: 1000000, max: 1200000, rate: 0.15 },
        { min: 1200000, max: 1500000, rate: 0.2 },
        { min: 1500000, max: null, rate: 0.3 },
      ],
      rebateLimit: 700000, // Section 87A under new regime
      standardDeduction: 75000, // Budget 2024 update
      cessRate: 0.04,
      surcharge: [
        { threshold: 5000000, rate: 0.1 },
        { threshold: 10000000, rate: 0.15 },
        { threshold: 20000000, rate: 0.25 }, // Capped at 25% in new regime
      ],
    },
  },
  instruments: {
    ppf: {
      annualLimit: 150000,
      interestRate: 0.071,
      lockInYears: 15,
    },
    epf: {
      employeeContributionRate: 0.12,
      employerContributionRate: 0.0367,
      epsContributionRate: 0.0833,
      interestRate: 0.0825,
      wageCeiling: 15000,
    },
    nps: {
      taxDeductionLimit80CCD1B: 50000,
      mandatoryAnnuityPercentage: 0.4,
    },
  },
};

/**
 * Fetches the active financial rules.
 * Currently uses "local first" strategy. 
 * In the future, this will be wired to fetch from the Supabase `rules_config` table.
 */
export async function getFinancialRules(): Promise<FinancialRules> {
  // TODO (Phase 6): Wire up to Supabase:
  // const { data } = await supabase.from('rules_config').select('*').single();
  // if (data) return data.value as FinancialRules;
  
  return DEFAULT_RULES;
}

export function getFinancialRulesSync(): FinancialRules {
  return DEFAULT_RULES;
}
