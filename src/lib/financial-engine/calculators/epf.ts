import { FinancialRules } from '../types';

export interface EPFInput {
  currentBalance: number;
  basicSalaryAnnual: number;
  vpfContributionPercentage?: number; // Extra percentage on top of 12% (0 to 0.88)
  yearsToProject: number;
  salaryGrowthRate: number;
}

export interface EPFProjectionYear {
  year: number;
  age: number | null;
  openingBalance: number;
  employeeContribution: number;
  employerContribution: number;
  interestEarned: number;
  closingBalance: number;
}

export function projectEPF(input: EPFInput, rules: FinancialRules, currentAge: number | null = null): EPFProjectionYear[] {
  const projection: EPFProjectionYear[] = [];
  let balance = input.currentBalance;
  let currentBasic = input.basicSalaryAnnual;
  const vpfRate = input.vpfContributionPercentage || 0;
  
  const { employeeContributionRate, employerContributionRate, interestRate, wageCeiling } = rules.instruments.epf;
  const annualWageCeiling = wageCeiling * 12;

  for (let year = 1; year <= input.yearsToProject; year++) {
    // Total employee contribution = (12% + VPF%) of Basic Salary
    const employeeContrib = currentBasic * (employeeContributionRate + vpfRate);
    
    // Employer contribution = 3.67% of Basic Salary (capped at wage ceiling)
    const applicableBasicForEmployer = Math.min(currentBasic, annualWageCeiling);
    const employerContrib = applicableBasicForEmployer * employerContributionRate;
    
    // Annual contribution
    const totalAnnualContrib = employeeContrib + employerContrib;
    
    // In reality, interest is calculated on monthly running balances. 
    // For projection, we approximate by calculating full interest on opening balance 
    // and half interest on the current year's contribution.
    const interest = (balance * interestRate) + (totalAnnualContrib * interestRate) / 2;
    
    const closingBalance = balance + totalAnnualContrib + interest;
    
    projection.push({
      year,
      age: currentAge ? currentAge + year : null,
      openingBalance: balance,
      employeeContribution: employeeContrib,
      employerContribution: employerContrib,
      interestEarned: interest,
      closingBalance,
    });
    
    balance = closingBalance;
    currentBasic = currentBasic * (1 + input.salaryGrowthRate); // Salary increment for next year
  }
  
  return projection;
}
