import { getFinancialRulesSync } from '../src/lib/financial-engine/rules';
import { compareTaxRegimes } from '../src/lib/financial-engine/tax-engine';

const rules = getFinancialRulesSync();

console.log("=== Tax Engine Verification ===");

const input1 = {
  grossSalary: 1200000, // 12 LPA
  age: 30,
  hraExemption: 100000,
  ltaExemption: 0,
  otherExemptions: 0,
  deduction80C: 150000,
  deduction80D: 25000,
  deduction80CCD1B: 50000,
  deduction24B: 0,
  otherDeductions: 0
};

const result1 = compareTaxRegimes(input1, rules);
console.log(`\nScenario 1: 12 LPA with full 80C/80D/NPS and HRA`);
console.log(`Old Regime Tax: ₹${result1.oldRegime.totalTax.toLocaleString()}`);
console.log(`New Regime Tax: ₹${result1.newRegime.totalTax.toLocaleString()}`);
console.log(`Recommendation: ${result1.recommended} (Savings: ₹${result1.savings.toLocaleString()})`);

const input2 = {
  grossSalary: 1500000, // 15 LPA
  age: 30,
  hraExemption: 0,
  ltaExemption: 0,
  otherExemptions: 0,
  deduction80C: 0,
  deduction80D: 0,
  deduction80CCD1B: 0,
  deduction24B: 0,
  otherDeductions: 0
};

const result2 = compareTaxRegimes(input2, rules);
console.log(`\nScenario 2: 15 LPA with NO deductions`);
console.log(`Old Regime Tax: ₹${result2.oldRegime.totalTax.toLocaleString()}`);
console.log(`New Regime Tax: ₹${result2.newRegime.totalTax.toLocaleString()}`);
console.log(`Recommendation: ${result2.recommended} (Savings: ₹${result2.savings.toLocaleString()})`);

console.log("\nTests completed.");
