import { describe, it } from 'node:test';
import assert from 'node:assert';
import { projectEPF } from '../calculators/epf';
import { projectPPF } from '../calculators/ppf';
import { projectNPS } from '../calculators/nps';
import { getFinancialRulesSync } from '../rules';

const rules = getFinancialRulesSync();

describe('Financial Calculators', () => {
  it('should correctly project PPF balance', () => {
    // 1.5L per year for 15 years
    const projection = projectPPF({
      currentBalance: 0,
      annualDeposit: 150000,
      yearsToProject: 15
    }, rules);
    
    const finalYear = projection[projection.length - 1];
    const fv = finalYear.closingBalance;
    
    // Expected is approx ~40,68,209 based on PPF calculator formula
    assert.ok(fv > 3900000, "PPF value should be over 39 Lakhs");
    assert.ok(fv < 4100000, "PPF value should be under 41 Lakhs");
  });

  it('should correctly project EPF balance', () => {
    // Basic salary 50k/month -> 6L/year. 
    const projection = projectEPF({
      currentBalance: 0,
      basicSalaryAnnual: 600000,
      yearsToProject: 15,
      salaryGrowthRate: 0.1 // 10% salary bump each year
    }, rules);
    
    const finalYear = projection[projection.length - 1];
    const fv = finalYear.closingBalance;
    
    assert.ok(fv > 2500000, "EPF value should be over 25 Lakhs");
  });

  it('should correctly project NPS balance and maturity split', () => {
    // 50k annual deposit, 10% expected return, 20 years
    const { projection, maturity } = projectNPS({
      currentBalance: 0,
      annualDeposit: 50000,
      yearsToProject: 20,
      expectedReturnRate: 0.10
    }, rules, 40); // starting at age 40
    
    const finalYear = projection[projection.length - 1];
    assert.strictEqual(finalYear.age, 60, "Final age should be 60");
    
    // 50k * 20 = 10L principal, with 10% compounding, total is roughly 31.5L
    assert.ok(maturity.totalCorpus > 3000000, "NPS corpus should be over 30 Lakhs");
    
    // Mandatory annuity is 40%
    const expectedAnnuity = maturity.totalCorpus * 0.4;
    assert.strictEqual(maturity.mandatoryAnnuity, expectedAnnuity, "Mandatory annuity should be 40%");
    
    // Monthly pension assuming 6% rate
    const expectedMonthly = (expectedAnnuity * 0.06) / 12;
    assert.strictEqual(maturity.projectedMonthlyPension, expectedMonthly, "Monthly pension calculation should match assumption");
  });
});
