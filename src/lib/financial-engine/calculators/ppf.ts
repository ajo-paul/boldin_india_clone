import { FinancialRules } from '../types';

export interface PPFInput {
  currentBalance: number;
  annualDeposit: number;
  yearsToProject: number;
}

export interface PPFProjectionYear {
  year: number;
  age: number | null;
  openingBalance: number;
  deposit: number;
  interestEarned: number;
  closingBalance: number;
}

export function projectPPF(input: PPFInput, rules: FinancialRules, currentAge: number | null = null): PPFProjectionYear[] {
  const projection: PPFProjectionYear[] = [];
  let balance = input.currentBalance;
  
  const { annualLimit, interestRate } = rules.instruments.ppf;

  for (let year = 1; year <= input.yearsToProject; year++) {
    // PPF deposit cannot exceed the annual limit (₹1.5L currently)
    const deposit = Math.min(input.annualDeposit, annualLimit);
    
    // For projection, assuming deposit is evenly spread or made at the start.
    // Commonly in long-term projections, we take interest on opening balance + half of current deposit
    // to simulate monthly SIPs.
    const interest = (balance * interestRate) + (deposit * interestRate) / 2;
    
    const closingBalance = balance + deposit + interest;
    
    projection.push({
      year,
      age: currentAge ? currentAge + year : null,
      openingBalance: balance,
      deposit,
      interestEarned: interest,
      closingBalance,
    });
    
    balance = closingBalance;
  }
  
  return projection;
}
