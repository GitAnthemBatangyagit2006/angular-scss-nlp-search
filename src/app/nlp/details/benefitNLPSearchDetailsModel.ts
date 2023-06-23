import { BenefitDetailsCostShares, BenefitDetailsNetworks, BenefitDetailsSituations } from "./benefitNLPSearchDetailsModel10x";

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

}
export interface Network {
    benefitOption: CodeDescription<string>;
    costShare: CostShareInformation[];
    costShareCode?: string;
    coverageLevel?: string;
    networkName?: string;
}

export interface  CostShareInformation {
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
    networkName: string;
    serviceLocations: string[];
  }

export interface ServiceLimit {
    limit: string;
    remaining: string;
    used: string;
}


const benefitDetails = {
    "benefitResults": [
        {
            "mcid": "326378610",
            "contractUID": "335E8957370545B46C9BA579E99A189A",
            "effectiveDt": "01012023",
            "benefitSysId": "23f17bfa-1b39-449a-8723-624ff57e0165",
            "serviceCategory": [
                {
                    "planType": "Medical",
                    "services": [
                        {
                            "parentCategoryNm": "Others",
                            "categoryNm": "Transplants - (BDCT Facility)",
                            "service": [
                                {
                                    "benefitNm": "Live Donor Health Services",
                                    "benefitDesc": "Hello world",
                                    "srvcDefnId": [
                                        "DONORPROF",
                                        "UNRDNRFAC",
                                        "DONORFAC",
                                        "UNRDNRPRF"
                                    ],
                                    "notes": [
                                        "\n\n##Cost-Share\n\nOther in-network transplant facilities can be utilized if a COE/BDCT facility is not available for a particular transplant (e.g., cornea, kidney, intestinal and certain multiple organ transplants) as long as the transplant has been approved by Utilization Management.\n\n##Cost-Share\n\nPenalty - No Precert on File : If claims are not pre-certified they will be denied as not covered. Once information is received claims can be re-opened based on medical information provided.\n\n##Cost-Share\n\nPenalty - Not Medically Necessary : If you do not obtain the required Pre-certification, you are responsible for all charges of services Anthem determines are not medically necessary."
                                    ],
                                    "situations": [
                                        {
                                            "pos": [
                                                {
                                                    "posDesc": "Blue Distinction Center Transplant  Facility"
                                                }
                                            ],
                                            "providerSpecialty": [
                                                "BD"
                                            ],
                                            "networks": [
                                                {
                                                    "code": "INN",
                                                    "type": "In Network",
                                                    "limitations": [
                                                        "Limit : 90 Days"
                                                    ],
                                                    "deductibleApplies": "Yes",
                                                    "precertRequired": "Y",
                                                    "precertNotes": [
                                                        "\n\nTRANSPLANTATION"
                                                    ],
                                                    "costshares": [
                                                        {
                                                            "type": "Coinsurance",
                                                            "value": "10%"
                                                        },
                                                        {
                                                            "type": "Copayment",
                                                            "value": "Not Applicable"
                                                        },
                                                        {
                                                            "type": "Limit",
                                                            "value": "90 Days Per Transplant"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "code": "OON",
                                                    "type": "Out of Network",
                                                    "limitations": [
                                                        "Limit : Not Applicable"
                                                    ],
                                                    "precertRequired": "Not Applicable",
                                                    "costshares": [
                                                        {
                                                            "type": "Coinsurance",
                                                            "value": "Not Applicable"
                                                        },
                                                        {
                                                            "type": "Copayment",
                                                            "value": "Not Applicable"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "includedServices": [
                                      "Chemotherapy",
                                      "Hemodialysis",
                                      "Occupational Therapy",
                                      "Physical Therapy",
                                      "Radiation Therapy",
                                      "Speech Therapy"
                                  ],
                                  "excludedServices": [],
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

const transform  = () => {
   const serviceDetails = benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0]; 
   const situations = this.transformNetwork(benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].situations);
  const benefitDetailsModel: NlpBenefitsSummaryDetails = {

  benefit: {
    name:  benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].benefitDesc,
    description:  benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].benefitNm,
    systemId: benefitDetails.benefitResults[0].benefitSysId,
  },
  category: benefitDetails.benefitResults[0].serviceCategory[0].services[0].categoryNm,
  excludedServices: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].excludedServices,
  includedServices: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].includedServices,
  networks: transformNetwork(benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].situations),
  //serviceLimit: ServiceLimit;
 // serviceNote: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].notes
  //serviceType: string;

};

const transformNetwork = (situations: BenefitDetailsSituations): BenefitsNetwork[] => {

  return (situations.networks || []).map((network: BenefitDetailsNetworks) => {
      const networks: BenefitsNetwork =
      {
          costShares: transformCostShares(network.costshares),
          isPriorAuthorizationRequired: (network.precertRequired === 'Yes' || network.precertRequired === 'Y'),
          isDeductibleApplied: (network.deductibleApplies === 'Yes' || network.precertRequired === 'Y'),
          networkName: network.type,
          serviceLocations: situations.pos.map((placeOfService) => placeOfService.posDesc ),
          benefitSummary: network.benefitScript
      }
      return networks;
   });
}

const transformCostShares = (costShares: BenefitDetailsCostShares[]): CostShareInformation[] => {
    
 return costShares.map((costShare: BenefitDetailsCostShares) => {
    const costShareInfo: CostShareInformation = {
    name: costShare.type,
    value: costShare.value,
    remaining: costShare.remaining,
    spent: costShare.accumulated
    };
    return costShareInfo;
    })
};

const transformServiceLimits = () => {

}


const transformServiceLocation = () => {
  return  benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].situations[0].pos.map((placeOfService) => placeOfService.posDesc ).join(',')
}

console.clear();
console.log(transformServiceLocation());
/*
1. You will have only 1 item in an array for (benefitResults,serviceCategory,services,service, situations )
2. serviceDeductibles vs deductibleApplies ?
3. serviceType: string;
4. How do we map these limits?
   "limitations": [
     "Limit : 90 Days"
  ],
*/