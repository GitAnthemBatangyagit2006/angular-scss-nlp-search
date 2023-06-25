import { OverrideType } from './overrideType';
import { CostShareInformation, CoverageTypeCode } from './benefits';


export interface CodeDescription<Type> {
  code: Type;
  description?: string;
  name?: string;
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
