

export type OverrideType<T, R> = Omit<T, keyof R> & R;

export enum BenefitSearchType {
  CATEGORY = 'category',
  KEYWORD = 'keyword'
}

export enum BenefitSummaryFilterType {
  NETWORK = 'NETWORK',
  PLACE_OF_SERVICE = 'PLACE_OF_SERVICE'
}

export enum BenefitsNLPUrl {
  BENEFITS_NLP_SUMMARY = '/benefits-nlp-summary',
  BENEFITS_NLP_SEARCH = '/benefits-nlp-search'
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
export declare enum BankErrorCode {
  COURTESY_LINK = "2002",
  GENERIC = "2001"
}

export interface CodeDescription<Type> {
  code: Type;
  description?: string;
  name?: BankErrorCode | string;
}

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

export interface NlpBenefitsKeywordSearchResult {
  benefitsKeywords: string[];
}
export interface NlpBenefitsSummarySearchResult {
  benefitsSummaries: NlpBenefitsSummary[];
  documentId: string;
}
export interface NlpBenefit {
  description: string;
  name: string;
  systemId: string;
}
export interface NlpBenefitsSummary {
  benefit: NlpBenefit;
  coverageType: CoverageTypeCode;
  network: BenefitsNetwork;
}
export interface NlpBenefitsSummaryDetails {
  benefit: NlpBenefit;
  category: string;
  excludedServices: string[];
  includedServices: string[];
  networks: BenefitsNetwork[];
  serviceNote: string;
  serviceType: string;
}

export type NlpCostShareInformation = OverrideType<CostShareInformation, {
  remaining?: number | string;
  spent?: number | string;
}>;

export interface BenefitsNetwork {
  benefitSummary?: string;
  costShares?: NlpCostShareInformation[];
  isDeductibleApplied: boolean;
  isPriorAuthorizationRequired: boolean;
  networkCode: CodeDescription<string>;
  serviceLocations: string[];
}

export interface NlpBenefitsKeywordSearchResult {
  benefitsKeywords: string[];
}
export interface NlpBenefitsSummarySearchResult {
  benefitsSummaries: NlpBenefitsSummary[];
  documentId: string;
}
export interface NlpBenefit {
  description: string;
  name: string;
  systemId: string;
}
export interface NlpBenefitsSummary {
  benefit: NlpBenefit;
  coverageType: CoverageTypeCode;
  network: BenefitsNetwork;
}
export interface NlpBenefitsSummaryDetails {
  benefit: NlpBenefit;
  category: string;
  excludedServices: string[];
  includedServices: string[];
  networks: BenefitsNetwork[];
  serviceNote: string;
  serviceType: string;
}
export interface BenefitsNetwork {
  benefitSummary?: string;
  costShares?: NlpCostShareInformation[];
  isDeductibleApplied: boolean;
  isPriorAuthorizationRequired: boolean;
  networkCode: CodeDescription<string>;
  serviceLocations: string[];
}


export interface BenefitKeywordsDTO {
  benefitsKeywords: string[];
}

export interface BenefitKeywordsRequest {
  keyword: string;
  memberBusinessUnit: MemberBusinessUnit;
}

export interface BenefitSummaryDTO {
  benefitKeywords: string[];
}

export interface BenefitSummaryRequest {
  contractUid: string;
  dateOfService: string;
  inquiryKeyword: string;
  inquiryCategory: string;
}

export interface BenefitDetailsDTO {
  benefitDetail: unknown;
}

export interface BenefitDetailsRequest {
  benefitSysId: string;
  contractUid: string;
  dateOfService: string;
  docId: string;
}

export interface BenefitSummaryFilter {
  type: BenefitSummaryFilterType;
  value: string;
  selected: boolean;
}

export interface BenefitSummarySearchResult {
  benefitSummary: NlpBenefitsSummary[];
  contractUid: string;
  dateOfServicepPlanType: string;
  documentId: string;
  filterBenefitSummary: NlpBenefitsSummary[];
  filters: BenefitSummaryFilter[];
  selectedFilters?: BenefitSummaryFilter[];
}

export interface BenefitsListAndFilters {
  availableFilters: BenefitSummaryFilter[];
  benefitsSummaries: NlpBenefitsSummary[];
}

export interface BenefitDetailsToBeTransformed {
  content: BenefitNLPSearchDetails;
  coveredMembers: IMemberBasic[];
  rawBenefitDetails: NlpBenefitsSummaryDetails;
  selectedMemberId: string;
  selectedNetwork: BenefitsNetwork;
}

export interface TransformBenefitSummaryRequest {
  contractUid: string;
  effectiveDate: string;
  filterKeys: BenefitSummaryFilter[];
  nlpBenefitsSummarySearchResult: NlpBenefitsSummarySearchResult;
}


export enum MemberBusinessUnit {
  INDIVIDUAL = 'IND',
  LARGE_GROUP = 'LG',
  NATIONAL = 'NT',
  SENIOR_EMPLOYER = 'SNR-EGR',
  SENIOR_INDIVIDUAL = 'SNR-IND',
  SMALL_GROUP = 'SM'
}
export interface BenefitNLPSearchDetails {
  additionalInformationTitle: string;
  benefitSummaryTitle: string;
  category: string;
  contentLoadingMessage: string;
  coveredMemberLabel: string;
  deductibleApplies: string;
  errorDefaultMessage: string;
  excludedServicesTitle: string;
  includedServicesTitle: string;
  no: string;
  priorAuthorization: string;
  serviceDeductible: string;
  serviceLimits: ServiceLimits;
  serviceLocation: string;
  serviceNotes: string;
  serviceType: string;
  showLess: string;
  showMore: string;
  title: string;
  toolTips: { [key: string]: string };
  yes: string;
}


export interface ServiceLimits {
  coveredMember: string;
  description: string;
  limitHeader: string;
  remainingHeader: string;
  title: string;
  usedHeader: string;
}


export interface IMemberBasic {
  mbrUid?: string;
  firstNm: string;
  middleNm?: string;
  lastNm: string;
  dob?: string; //API value: yyyy-MM-dd

  // Use label to display 'FirstName LastName (MM/dd/yyyy)'
  label?: string;
  value?: string;

  // Use nameDisplay to display 'Firstname Lastname'
  nameDisplay?: string;

  // Use dobDisplay to display 'MM/dd/yyyy'
  dobDisplay?: string;
  dobAria?: string;
}
