export interface BenefitSummaryFilter {
  type: BenefitSummaryFilterType;
  value: string;
}

export interface BenefitSummarySearchResult {
  contractUid: string;
  dateOfServicepPlanType: string;
  benefitSummary: BenefitSummary[];
  filterBenefitSummary: BenefitSummary[];
  filters: BenefitSummaryFilter[];
  selectedFilters?: BenefitSummaryFilter[];
  benefitAssociatedDetails: {
    benefitId: string;
    planType: string;
  };
}

export interface BenefitSummary {
  documentId: string;
  planType: string;
  benefitSystemId: string;
  benefitName: string;
  placeOfService: string[];
  benefitDescription: string;
  network: string;
  coPayment: string;
  coInsurance: string;
  deductibleApplies: boolean;
  priorAuthorization: boolean;
}

export interface BenefitSummaryResponseDTO {
  benefitResults?: BenefitResult[];
}

export interface BenefitResult {
  mcid: string;
  contractUID: string;
  contractCd: string;
  docID: string;
  effectiveDt: string;
  inquiryUsed: string;
  serviceCategory?: ServiceCategory[]; //added []
}

export interface ServiceCategory {
  categories?: Categories[];
  planType: string;
}

export interface Categories {
  parentCategoryNm: string;
  services?: Services[];
}

export interface Services {
  categoryNm: string;
  benefit?: Benefit[];
}

export interface Benefit {
  benefitNm?: string;
  benefitDesc?: string[];
  benefitSysID: string;
  situations?: Situations[];
  serviceNm?: string;
}

export interface Situations {
  pos?: PlaceOfService[];
  networks?: Networks[];
}

export interface PlaceOfService {
  posCd: number | string;
  posDesc: string;
}

export interface Networks {
  code: string;
  type: string;
  deductibleApplies?: string;
  precertRequired: string;
  precertNotes?: string[];
  costshares?: Costshares[];
  notes?: string[];
}

export interface Costshares {
  type: string;
  value: string;
}

export interface BenefitsListAndFilters {
  availableFilters: BenefitSummaryFilter[];
  benefitSummaryList: BenefitSummary[];
}
export enum BenefitSummaryFilterType {
  PLACE_OF_SERVICE = 'PLACE_OF_SERVICE',
  NETWORK = 'NETWORK',
}

export enum BenefitSummaryFilterNetwork {
  IN_NETWORK = 'IN NETWORK',
  OUT_OF_NETWORK = 'OUT OF NETWORK',
}
