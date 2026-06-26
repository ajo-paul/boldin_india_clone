export interface InflationInput {
  currentCost: number;
  yearsToGoal: number;
  inflationRate: number; // e.g. 0.06 for 6%
}

/**
 * Calculates the future cost of an expense given the inflation rate.
 */
export function calculateFutureCost(input: InflationInput): number {
  return input.currentCost * Math.pow(1 + input.inflationRate, input.yearsToGoal);
}

export interface CorpusRequirementInput {
  annualExpenseAtRetirement: number;
  yearsInRetirement: number;
  expectedReturnRate: number; // Post-retirement return
  inflationRate: number; // Post-retirement inflation
}

/**
 * Calculates the total corpus required at the start of retirement to sustain expenses,
 * adjusting for inflation every year, assuming the corpus grows at the expectedReturnRate.
 * This uses the Present Value of a growing annuity formula.
 */
export function calculateRequiredCorpus(input: CorpusRequirementInput): number {
  const { annualExpenseAtRetirement, yearsInRetirement, expectedReturnRate, inflationRate } = input;
  
  // Real rate of return (inflation adjusted return)
  // formula: r_real = ((1 + return) / (1 + inflation)) - 1
  const realReturn = ((1 + expectedReturnRate) / (1 + inflationRate)) - 1;

  if (realReturn === 0) {
    return annualExpenseAtRetirement * yearsInRetirement;
  }

  // Present Value of growing annuity
  const pvFactor = (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn;
  
  // Total corpus required at year 0 of retirement
  return annualExpenseAtRetirement * pvFactor;
}
