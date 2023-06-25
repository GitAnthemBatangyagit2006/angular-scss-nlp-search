export declare enum CoverageTypeCode {
  ACCIDENTAL_DEATH_AND_DISMEMBERMENT = "ADD",
  DENTAL = "DEN",
  DISABILITY = "DISABILITY",
  EMPLOYEE_ASSISTANCE_PROGRAM = "EAP",
  LIFE = "LIF",
  LONG_TERM_DISABILITY = "LTD",
  MEDICAL = "MED",
  PHARMACY = "PHAR",
  SHORT_TERM_DISABILITY = "STD",
  SUPPLEMENT = "SUPP",
  SUPPLEMENTAL_ACCIDENTAL_DEATH_AND_DISMEMBERMENT = "SADD",
  VISION = "VSN",
  VOLUNTARY_LONG_TERM_DISABILITY = "VLTD",
  VOLUNTARY_SHORT_TERM_DISABILITY = "VSTD"
}

export interface CostShareInformation {
  benefitCode?: BenefitCode;
  hasUnlimitedLimitAndRemaining?: boolean;
  isZeroDeductible?: boolean;
  isZeroOutOfPocket?: boolean;
  memberCode?: string;
  name: string;
  planPercentage?: number;
  remaining?: number;
  spent?: number;
  total?: number;
  value: string;
}

export declare enum BenefitCode {
  ADDITIONAL_DEDUCTIBLE = "additionaldeductible",
  ADDITIONAL_DEDUCTIBLE_INDIVIDUAL = "additionaldeductibleindividual",
  AUTO_RESTORE = "autorestore",
  BENEFIT_PERIOD = "bperiod",
  BENEFIT_PERIOD_MAXIMUM = "benefitperiodmax",
  COINSURANCE = "coinsurance",
  COINSURANCE_DETAIL = "coinsdetail",
  COINSURANCE_MAXIMUM = "coninsurancemaximum",
  COINSURANCE_MINIMUM = "coinsuranceminimum",
  COPAYMENT = "copayment",
  COPAYMENT_MAXIMUM = "copaymentmax",
  COPAY_MAXIMUM = "oopmaxcopay",
  CROSS_ACCUMULATION_DEDUCTIBLE = "carded",
  CROSS_ACCUMULATION_OUT_OF_POCKET = "caroop",
  DEDUCTIBLE = "deductible",
  DOLLAR_LIMIT = "dollarlimit",
  DRUG_SPECIFIC = "drugspecific",
  DRUG_SPECIFIC_CAP = "Drug Specific Cap",
  FAMILY = "family",
  FIRST_DOLLAR_COVERAGE = "firstdollarcvrg",
  HEALTHY_REWARDS = "healthyrewards",
  INDIVIDUAL = "individual",
  INITIAL_COPAYMENT = "initialcopayment",
  LIFE_TIME_MAXIMUM = "lifetimemax",
  LIMIT = "limit",
  LQCDDED = "lqcdded",
  LQCDOOP = "lqcdoop",
  MEMBER_CLAIMS_FILING_LIMIT = "mlimit",
  MISCELLANEOUS = "misc",
  OUT_OF_POCKET = "outofpocket",
  OUT_OF_POCKET_MAXIMUM = "outofpocketmax",
  PENALTY = "penalty",
  PHARMACY_COPAYMENT = "PharCopayment",
  PRE_AUTHORIZATION = "preauth",
  RENEWAL_PERIOD = "renewalperiod",
  SERVICE_COINSURANCE_MAXIMUM = "servicecoinsurancemaximum",
  SERVICE_COPAYMENT_MINIMUM = "servicecopaymentminimum",
  SERVICE_DEDUCTIBLE = "servicedeductible",
  SERVICE_DEDUCTIBLE_MAXIMUM = "servicedeductiblemaximum",
  SERVICE_OUT_OF_POCKET = "serviceoutofpocket",
  UNLIMITED = "unlimited",
  UP_FRONT_DEDUCTIBLE = "upfrontdeductible"
}