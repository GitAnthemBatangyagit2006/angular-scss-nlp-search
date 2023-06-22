import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  posCd!: string;

  @IsString()
  @IsNotEmpty()
  posDesc!: string;
}

export class BenefitDetailsSituations {
  @IsString()
  @IsNotEmpty()
  pos!: BenefitDetailsPOS[];

  @IsString()
  @IsNotEmpty()
  diagnosisCd!: string[];

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


  @IsString()
  @IsNotEmpty()
  accumulated!: string;

  @IsString()
  @IsNotEmpty()
  remaining!: string;
}

export class BenefitDetailsNetworks {
  @IsString()
  @IsNotEmpty()
  benefitScript!: string[];

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  limitations!: string[];

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
  MEDICAL = 'MED'
}
