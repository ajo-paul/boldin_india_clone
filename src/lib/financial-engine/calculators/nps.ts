import { FinancialRules } from '../types';

export interface NPSInput {
  currentBalance: number;
  annualDeposit: number;
  yearsToProject: number; // typically until age 60
  expectedReturnRate: number; // Blended return of equity/corporate/g-sec
}

export interface NPSProjectionYear {
  year: number;
  age: number | null;
  openingBalance: number;
  deposit: number;
  returnEarned: number;
  closingBalance: number;
}

export interface NPSMaturity {
  totalCorpus: number;
  lumpSumAvailable: number; // 60%
  mandatoryAnnuity: number; // 40%
  projectedMonthlyPension: number; // assuming e.g. 6% annuity rate
}

export function projectNPS(input: NPSInput, rules: FinancialRules, currentAge: number | null = null): { projection: NPSProjectionYear[], maturity: NPSMaturity } {
  const projection: NPSProjectionYear[] = [];
  let balance = input.currentBalance;
  
  for (let year = 1; year <= input.yearsToProject; year++) {
    const deposit = input.annualDeposit;
    
    // SIP style interest approximation
    const returnEarned = (balance * input.expectedReturnRate) + (deposit * input.expectedReturnRate) / 2;
    
    const closingBalance = balance + deposit + returnEarned;
    
    projection.push({
      year,
      age: currentAge ? currentAge + year : null,
      openingBalance: balance,
      deposit,
      returnEarned,
      closingBalance,
    });
    
    balance = closingBalance;
  }
  
  const { mandatoryAnnuityPercentage } = rules.instruments.nps;
  const mandatoryAnnuity = balance * mandatoryAnnuityPercentage;
  const lumpSumAvailable = balance * (1 - mandatoryAnnuityPercentage);
  
  // Assuming a standard 6% annuity rate for monthly pension estimation
  const ANNUITY_RATE_ASSUMPTION = 0.06;
  const projectedMonthlyPension = (mandatoryAnnuity * ANNUITY_RATE_ASSUMPTION) / 12;

  return {
    projection,
    maturity: {
      totalCorpus: balance,
      lumpSumAvailable,
      mandatoryAnnuity,
      projectedMonthlyPension,
    }
  };
}
