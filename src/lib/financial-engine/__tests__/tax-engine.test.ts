import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateOldRegime, calculateNewRegime, compareTaxRegimes } from '../tax-engine';
import { getFinancialRulesSync } from '../rules';

const rules = getFinancialRulesSync();

describe('Tax Engine Calculators', () => {
  it('should correctly calculate Old Regime tax for 7L income (fully rebated)', () => {
    // 7L income, 50k standard deduction -> 6.5L taxable.
    // If they have 1.5L 80C -> 5L taxable.
    // At 5L, old regime tax is 12,500, fully rebated under 87A.
    const result = calculateOldRegime({
      grossSalary: 700000,
      age: 30,
      hraExemption: 0,
      ltaExemption: 0,
      otherExemptions: 0,
      deduction80C: 150000,
      deduction80D: 0,
      deduction80CCD1B: 0,
      deduction24B: 0,
      otherDeductions: 0
    }, rules);
    
    assert.strictEqual(result.taxableIncome, 500000, "Taxable income should be 5L");
    assert.strictEqual(result.baseTax, 12500, "Base tax should be 12500 before rebate");
    assert.strictEqual(result.rebate, 12500, "Full rebate should apply");
    assert.strictEqual(result.totalTax, 0, "Total tax should be 0");
  });

  it('should correctly calculate New Regime tax for 7L income (fully rebated)', () => {
    // 7L income, 75k standard deduction (Budget 2024) -> 6.25L taxable.
    // In new regime, rebate limit is 7L taxable income.
    const result = calculateNewRegime({
      grossSalary: 700000,
      age: 30,
      hraExemption: 0,
      ltaExemption: 0,
      otherExemptions: 0,
      deduction80C: 150000, // ignored in new regime
      deduction80D: 0,
      deduction80CCD1B: 0,
      deduction24B: 0,
      otherDeductions: 0
    }, rules);
    
    assert.strictEqual(result.taxableIncome, 625000, "Taxable income should be 6.25L");
    assert.ok(result.rebate > 0, "Rebate should apply");
    assert.strictEqual(result.totalTax, 0, "Total tax should be 0");
  });

  it('should calculate surcharge correctly for high income (> 50L)', () => {
    // 60L income. Taxable around 59.25L. Surcharge is 10%.
    const result = calculateNewRegime({
      grossSalary: 6000000,
      age: 30,
      hraExemption: 0,
      ltaExemption: 0,
      otherExemptions: 0,
      deduction80C: 0,
      deduction80D: 0,
      deduction80CCD1B: 0,
      deduction24B: 0,
      otherDeductions: 0
    }, rules);
    
    assert.ok(result.surcharge > 0, "Surcharge should be applied");
  });

  it('should recommend the better tax regime', () => {
    // High deductions usually favor old regime.
    // Gross: 15L. Deductions: 1.5L (80C), 50k (80D), 2L (24B) = 4L.
    const comparison = compareTaxRegimes({
      grossSalary: 1500000,
      age: 30,
      hraExemption: 0,
      ltaExemption: 0,
      otherExemptions: 0,
      deduction80C: 150000,
      deduction80D: 50000,
      deduction80CCD1B: 0,
      deduction24B: 200000,
      otherDeductions: 0
    }, rules);
    
    // With 4L deductions + 50k standard deduction, old regime taxable is 10.5L. (Tax = 1,32,600)
    // New regime taxable is 14.25L. (Tax = 1,30,000)
    // New regime is slightly better under Budget 2024 slabs.
    assert.strictEqual(comparison.recommended, 'NEW', "Should recommend NEW regime for these inputs under Budget 2024");
  });
});
