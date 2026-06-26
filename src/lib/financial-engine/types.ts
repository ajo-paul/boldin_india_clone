export interface TaxSlab {
  min: number;
  max: number | null; // null represents infinity
  rate: number;
}

export interface TaxRules {
  oldRegime: {
    slabs: {
      general: TaxSlab[];
      senior: TaxSlab[];
      superSenior: TaxSlab[];
    };
    rebateLimit: number;
    standardDeduction: number;
    cessRate: number;
    surcharge: { threshold: number; rate: number }[];
  };
  newRegime: {
    slabs: TaxSlab[];
    rebateLimit: number;
    standardDeduction: number;
    cessRate: number;
    surcharge: { threshold: number; rate: number }[];
  };
}

export interface InstrumentRules {
  ppf: {
    annualLimit: number;
    interestRate: number; // e.g. 0.071
    lockInYears: number;
  };
  epf: {
    employeeContributionRate: number; // e.g. 0.12
    employerContributionRate: number; // e.g. 0.0367
    epsContributionRate: number; // e.g. 0.0833
    interestRate: number; // e.g. 0.0825
    wageCeiling: number; // e.g. 15000
  };
  nps: {
    taxDeductionLimit80CCD1B: number; // e.g. 50000
    mandatoryAnnuityPercentage: number; // e.g. 0.4
  };
}

export interface FinancialRules {
  tax: TaxRules;
  instruments: InstrumentRules;
}
