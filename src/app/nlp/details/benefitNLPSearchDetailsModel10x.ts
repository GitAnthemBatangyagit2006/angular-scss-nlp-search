import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Just added to have a descripive type. Expecting upcoming changes on the structure.
export type BenefitsKeywordAssistResponseDTO = string[];

export class BenefitSummaryRequestDTO {
  @IsString()
  @IsNotEmpty()
  contractUid!: string;

  @IsString()
  @IsNotEmpty()
  dateOfService!: string;

  @IsString()
  @IsNotEmpty()
  inquiryKeyword!: string;

  @IsString()
  @IsNotEmpty()
  mcId!: string;
}

export class BenefitDetailsRequestDTO {
  @IsString()
  @IsNotEmpty()
  benefitSysId!: string;

  @IsString()
  @IsNotEmpty()
  contractUid!: string;

  @IsString()
  @IsNotEmpty()
  dateOfService!: string;

  @IsString()
  @IsNotEmpty()
  docId!: string;

  @IsString()
  @IsNotEmpty()
  mcId!: string;
}

export class BenefitSummaryRequest {
  @IsString()
  @IsNotEmpty()
  contractUid!: string;

  @IsString()
  @IsNotEmpty()
  dateOfService!: string;

  @IsString()
  @IsNotEmpty()
  inquiryKeyword!: string;
}

export class BenefitDetailsRequest {
  @IsString()
  @IsNotEmpty()
  benefitSysId!: string;

  @IsString()
  @IsNotEmpty()
  contractUid!: string;

  @IsString()
  @IsNotEmpty()
  dateOfService!: string;

  @IsString()
  @IsNotEmpty()
  docId!: string;
}

export class ErrorMessage {
  @IsString()
  @IsNotEmpty()
  errorCode!: string;

  @IsString()
  @IsNotEmpty()
  errorDetails!: string;
}

export class BenefitDetailsPOS {
  posCdx?: string;
  posDesc?: string;
}

export class BenefitDetailsSituations {
  @IsOptional()
  pos: BenefitDetailsPOS[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  diagnosisCd?: string[];

  @IsString()
  @IsNotEmpty()
  providerSpecialty!: string[];

  @IsString()
  @IsNotEmpty()
  networks!: BenefitDetailsNetworks[];
}

export class BenefitDetailsProviderSpecialty {
  @IsString()
  @IsNotEmpty()
  speciality!: string;
}

export class BenefitDetailsCostShares {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;

  accumulated?: string;

  remaining?: string;
}

export class BenefitDetailsNetworks {
  benefitScript?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  limitations!: string[];

  deductibleApplies?: string;

  @IsString()
  @IsNotEmpty()
  precertRequired!: string;

  @IsString()
  @IsNotEmpty()
  precertNotes?: string[];

  @IsString()
  referralRequired?: string;

  @IsString()
  @IsNotEmpty()
  costshares!: BenefitDetailsCostShares[];
}

export class SharedServices {
  @IsString()
  @IsNotEmpty()
  accumname!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;

  @IsString()
  @IsNotEmpty()
  servicenames!: string[];
}

export class DiagnosisCd {
  @IsString()
  @IsNotEmpty()
  code!: string;
}

export class BenefitDetailsService {
  @IsString()
  @IsNotEmpty()
  benefitNm!: string;

  @IsString()
  benefitDesc?: string;

  @IsString()
  @IsNotEmpty()
  includedServices!: string[];

  @IsString()
  @IsNotEmpty()
  excludedServices!: string[];

  @IsString()
  @IsNotEmpty()
  srvcDefnId!: string[];

  @IsString()
  @IsNotEmpty()
  notes!: string[];

  @IsString()
  @IsNotEmpty()
  situations!: BenefitDetailsSituations[];
}

export class BenefitDetailsServices {
  @IsString()
  @IsNotEmpty()
  parentCategoryNm!: string;

  @IsString()
  @IsNotEmpty()
  categoryNm!: string;

  @IsString()
  @IsNotEmpty()
  service!: BenefitDetailsService[];
}

export class BenefitSummaryCostShares {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class BenefitSummaryNetworks {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  deductibleApplies!: string;

  @IsString()
  @IsNotEmpty()
  precertRequired!: string;

  @IsString()
  @IsNotEmpty()
  precertNotes!: string[];

  @IsString()
  @IsNotEmpty()
  costshares!: BenefitSummaryCostShares[];
}

export class BenefitDetailsServiceCategory {
  @IsString()
  @IsNotEmpty()
  planType!: string;

  @IsString()
  @IsNotEmpty()
  services!: BenefitDetailsServices[];
}

export class POS {
  @IsString()
  @IsNotEmpty()
  posCd!: string;

  @IsString()
  @IsNotEmpty()
  posDesc!: string;
}

export class BenefitSummarysSituations {
  @IsString()
  @IsNotEmpty()
  pos!: POS[];

  @IsString()
  @IsNotEmpty()
  networks!: BenefitSummaryNetworks[];
}

export class BenefitsData {
  @IsString()
  @IsNotEmpty()
  benefitNm!: string;

  @IsString()
  @IsNotEmpty()
  benefitDesc!: string;

  @IsString()
  @IsNotEmpty()
  benefitSysID!: string;

  @IsString()
  @IsNotEmpty()
  situations!: BenefitSummarysSituations[];
}

export class BenefitSummaryService {
  @IsString()
  @IsNotEmpty()
  categoryNm!: string;

  @IsString()
  @IsNotEmpty()
  benefits!: BenefitsData[];
}

export class Categories {
  @IsString()
  @IsNotEmpty()
  parentCategoryNm!: string;

  @IsString()
  @IsNotEmpty()
  services!: BenefitSummaryService[];
}

export class BenefitSummaryServiceCategory {
  @IsString()
  @IsNotEmpty()
  planType!: string;

  @IsString()
  @IsNotEmpty()
  categories!: Categories[];
}

export class BenefitSummaryResponseDTO {
  benefitResults!: BenefitSummary[];
}

export class BenefitSummary {
  @IsString()
  @IsNotEmpty()
  mcid!: string;

  @IsString()
  @IsNotEmpty()
  contractUID!: string;

  @IsString()
  @IsNotEmpty()
  docID!: string;

  @IsString()
  @IsNotEmpty()
  contractCd!: string;

  @IsString()
  @IsNotEmpty()
  effectiveDt!: string;

  @IsString()
  @IsNotEmpty()
  inquiryUsed!: string;

  @IsString()
  @IsNotEmpty()
  serviceCategory!: BenefitSummaryServiceCategory[];
}

export class BenefitDetailsResponseDTO {
  @IsString()
  @IsNotEmpty()
  mcid!: string;

  @IsString()
  @IsNotEmpty()
  contractUID!: string;

  @IsString()
  @IsNotEmpty()
  effectiveDt!: string;

  @IsString()
  @IsNotEmpty()
  benefitSysId!: string;

  @IsString()
  @IsNotEmpty()
  serviceCategory!: BenefitDetailsServiceCategory[];
}

export enum PlanType {
  MEDICAL = 'MED',
}

export type OverrideType<T, R> = Omit<T, keyof R> & R;

export declare enum BenefitCode {
  ADDITIONAL_DEDUCTIBLE = 'additionaldeductible',
  ADDITIONAL_DEDUCTIBLE_INDIVIDUAL = 'additionaldeductibleindividual',
  AUTO_RESTORE = 'autorestore',
  BENEFIT_PERIOD = 'bperiod',
  BENEFIT_PERIOD_MAXIMUM = 'benefitperiodmax',
  COINSURANCE = 'coinsurance',
  COINSURANCE_DETAIL = 'coinsdetail',
  COINSURANCE_MAXIMUM = 'coninsurancemaximum',
  COINSURANCE_MINIMUM = 'coinsuranceminimum',
  COPAYMENT = 'copayment',
  COPAYMENT_MAXIMUM = 'copaymentmax',
  COPAY_MAXIMUM = 'oopmaxcopay',
  CROSS_ACCUMULATION_DEDUCTIBLE = 'carded',
  CROSS_ACCUMULATION_OUT_OF_POCKET = 'caroop',
  DEDUCTIBLE = 'deductible',
  DOLLAR_LIMIT = 'dollarlimit',
  DRUG_SPECIFIC = 'drugspecific',
  DRUG_SPECIFIC_CAP = 'Drug Specific Cap',
  FAMILY = 'family',
  FIRST_DOLLAR_COVERAGE = 'firstdollarcvrg',
  HEALTHY_REWARDS = 'healthyrewards',
  INDIVIDUAL = 'individual',
  INITIAL_COPAYMENT = 'initialcopayment',
  LIFE_TIME_MAXIMUM = 'lifetimemax',
  LIMIT = 'limit',
  LQCDDED = 'lqcdded',
  LQCDOOP = 'lqcdoop',
  MEMBER_CLAIMS_FILING_LIMIT = 'mlimit',
  MISCELLANEOUS = 'misc',
  OUT_OF_POCKET = 'outofpocket',
  OUT_OF_POCKET_MAXIMUM = 'outofpocketmax',
  PENALTY = 'penalty',
  PHARMACY_COPAYMENT = 'PharCopayment',
  PRE_AUTHORIZATION = 'preauth',
  RENEWAL_PERIOD = 'renewalperiod',
  SERVICE_COINSURANCE_MAXIMUM = 'servicecoinsurancemaximum',
  SERVICE_COPAYMENT_MINIMUM = 'servicecopaymentminimum',
  SERVICE_DEDUCTIBLE = 'servicedeductible',
  SERVICE_DEDUCTIBLE_MAXIMUM = 'servicedeductiblemaximum',
  SERVICE_OUT_OF_POCKET = 'serviceoutofpocket',
  UNLIMITED = 'unlimited',
  UP_FRONT_DEDUCTIBLE = 'upfrontdeductible',
}

export declare enum CoverageTypeCode {
  ACCIDENTAL_DEATH_AND_DISMEMBERMENT = 'ADD',
  DENTAL = 'DEN',
  DISABILITY = 'DISABILITY',
  EMPLOYEE_ASSISTANCE_PROGRAM = 'EAP',
  LIFE = 'LIF',
  LONG_TERM_DISABILITY = 'LTD',
  MEDICAL = 'MED',
  PHARMACY = 'PHAR',
  SHORT_TERM_DISABILITY = 'STD',
  SUPPLEMENT = 'SUPP',
  SUPPLEMENTAL_ACCIDENTAL_DEATH_AND_DISMEMBERMENT = 'SADD',
  VISION = 'VSN',
  VOLUNTARY_LONG_TERM_DISABILITY = 'VLTD',
  VOLUNTARY_SHORT_TERM_DISABILITY = 'VSTD',
}

export interface Network {
  benefitOption: CodeDescription<string>;
  costShare: CostShareInformation[];
  costShareCode?: string;
  coverageLevel?: string;
  networkName?: string;
}

export interface CostShareInformation {
  benefitCode?: BenefitCode;
  hasUnlimitedLimitAndRemaining?: boolean;
  isZeroDeductible?: boolean;
  isZeroOutOfPocket?: boolean;
  memberCode?: string;
  name: string;
  planPercentage?: number;
  remaining?: number | string; // need to discuss with naman
  spent?: number | string; // need to discuss with naman
  total?: number;
  value: string;
}

export interface CodeDescription<Type> {
  code: Type;
  description?: string;
}

export declare class NlpBenefitsKeywordSearchResult {
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
  serviceLimit: ServiceLimit;
  serviceNote: string;
  serviceType: string;
}

export interface BenefitsNetwork {
  benefitSummary?: string;
  costShares?: CostShareInformation[]; // use CostShareInformation.name/CostShareInformation.benefitCode(Type) and CostShareInformation.value
  isDeductibleApplied: boolean;
  isPriorAuthorizationRequired: boolean;
  networkCode: CodeDescription<string>;
  serviceLocations: string[];
}

export interface ServiceLimit {
  limit: string;
  remaining: string;
  used: string;
}