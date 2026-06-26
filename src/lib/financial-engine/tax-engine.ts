import { FinancialRules, TaxSlab } from './types';

export interface TaxInput {
  grossSalary: number;
  age: number;
  
  // Exemptions (Old Regime mostly)
  hraExemption: number;
  ltaExemption: number;
  otherExemptions: number;

  // Deductions (Old Regime)
  deduction80C: number;      // Max 1.5L
  deduction80D: number;      // Health insurance
  deduction80CCD1B: number;  // NPS extra 50k
  deduction24B: number;      // Home loan interest
  otherDeductions: number;   // 80E, 80G, etc.
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  baseTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveTaxRate: number;
}

function calculateTaxFromSlabs(taxableIncome: number, slabs: TaxSlab[]): number {
  let tax = 0;
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAmountInSlab = slab.max === null 
        ? taxableIncome - slab.min 
        : Math.min(taxableIncome, slab.max) - slab.min;
      
      tax += taxableAmountInSlab * slab.rate;
    }
  }
  return tax;
}

function getSurchargeRate(taxableIncome: number, surchargeTiers: { threshold: number; rate: number }[]): number {
  let applicableRate = 0;
  for (const tier of surchargeTiers) {
    if (taxableIncome > tier.threshold) {
      applicableRate = tier.rate;
    }
  }
  return applicableRate;
}

export function calculateOldRegime(input: TaxInput, rules: FinancialRules): TaxResult {
  const { oldRegime } = rules.tax;
  
  // 1. Calculate Gross Total Income
  const grossTotalIncome = input.grossSalary 
    - input.hraExemption 
    - input.ltaExemption 
    - input.otherExemptions 
    - oldRegime.standardDeduction;

  // 2. Apply Deductions
  // 80C is capped at 1.5L conventionally, but we trust the input wrapper or enforce here.
  // We'll enforce the 1.5L limit here for safety, though technically it's a global rule.
  const capped80C = Math.min(input.deduction80C, 150000); 
  const capped80CCD1B = Math.min(input.deduction80CCD1B, rules.instruments.nps.taxDeductionLimit80CCD1B);
  
  const totalDeductions = capped80C + input.deduction80D + capped80CCD1B + input.deduction24B + input.otherDeductions;
  
  let taxableIncome = Math.max(0, grossTotalIncome - totalDeductions);
  
  // 3. Determine slabs based on age
  let slabs = oldRegime.slabs.general;
  if (input.age >= 80) slabs = oldRegime.slabs.superSenior;
  else if (input.age >= 60) slabs = oldRegime.slabs.senior;

  // 4. Calculate Base Tax
  let baseTax = calculateTaxFromSlabs(taxableIncome, slabs);

  // 5. Apply 87A Rebate
  let rebate = 0;
  if (taxableIncome <= oldRegime.rebateLimit) {
    rebate = baseTax; // Full rebate if under limit
    baseTax = 0;
  }

  // 6. Surcharge
  const surchargeRate = getSurchargeRate(taxableIncome, oldRegime.surcharge);
  const surcharge = baseTax * surchargeRate;

  // 7. Cess
  const taxAfterSurcharge = baseTax + surcharge;
  const cess = taxAfterSurcharge * oldRegime.cessRate;

  const totalTax = taxAfterSurcharge + cess;

  return {
    grossIncome: input.grossSalary,
    taxableIncome,
    baseTax: baseTax + rebate, // show what it was before rebate
    rebate,
    surcharge,
    cess,
    totalTax,
    effectiveTaxRate: input.grossSalary > 0 ? totalTax / input.grossSalary : 0
  };
}

export function calculateNewRegime(input: TaxInput, rules: FinancialRules): TaxResult {
  const { newRegime } = rules.tax;
  
  // 1. Calculate Gross Total Income
  // New regime removes most exemptions and deductions, but keeps standard deduction
  // and employer NPS contribution (80CCD(2)). We assume 80CCD(2) is handled outside or passed.
  const grossTotalIncome = input.grossSalary - newRegime.standardDeduction;

  // Deductions are essentially 0 in new regime except specific ones not modeled here.
  let taxableIncome = Math.max(0, grossTotalIncome);

  // 4. Calculate Base Tax
  let baseTax = calculateTaxFromSlabs(taxableIncome, newRegime.slabs);

  // 5. Apply 87A Rebate
  let rebate = 0;
  if (taxableIncome <= newRegime.rebateLimit) {
    rebate = baseTax;
    baseTax = 0;
  }

  // 6. Surcharge (capped in new regime)
  const surchargeRate = getSurchargeRate(taxableIncome, newRegime.surcharge);
  const surcharge = baseTax * surchargeRate;

  // 7. Cess
  const taxAfterSurcharge = baseTax + surcharge;
  const cess = taxAfterSurcharge * newRegime.cessRate;

  const totalTax = taxAfterSurcharge + cess;

  return {
    grossIncome: input.grossSalary,
    taxableIncome,
    baseTax: baseTax + rebate,
    rebate,
    surcharge,
    cess,
    totalTax,
    effectiveTaxRate: input.grossSalary > 0 ? totalTax / input.grossSalary : 0
  };
}

export function compareTaxRegimes(input: TaxInput, rules: FinancialRules): { oldRegime: TaxResult, newRegime: TaxResult, recommended: 'OLD' | 'NEW', savings: number } {
  const oldResult = calculateOldRegime(input, rules);
  const newResult = calculateNewRegime(input, rules);

  if (oldResult.totalTax <= newResult.totalTax) {
    return {
      oldRegime: oldResult,
      newRegime: newResult,
      recommended: 'OLD',
      savings: newResult.totalTax - oldResult.totalTax
    };
  } else {
    return {
      oldRegime: oldResult,
      newRegime: newResult,
      recommended: 'NEW',
      savings: oldResult.totalTax - newResult.totalTax
    };
  }
}
