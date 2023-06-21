
 interface NlpBenefitSummaryDetails {

  benefitDescription: string;

  benefitName: string;

  benefitSummary: string;

  category: string;

  excludedServices: string[];

  includedServices: string[];

  networks: Network[];

  serviceLimits: ServiceLimits;

  serviceNotes: string;

  serviceType: string;


}

 interface Network {

  costShares: CostShare[];

  networkType: string;

  priorAuthorization: string;
  deductibleApplies: string;
  serviceDeductibles: string;
  serviceLocation: string;

}


 interface CostShare {

  type: string;

  value: string;

}

 interface ServiceLimits {

  limit: string;

  memberCode: string;

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
  const benefitDetailsModel: NlpBenefitSummaryDetails = {
  benefitDescription:  benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].benefitDesc,
  benefitName:  benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].benefitNm,
  benefitSummary: "????",
  category: benefitDetails.benefitResults[0].serviceCategory[0].services[0].categoryNm, 
  excludedServices: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].includedServices,
  includedServices: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].excludedServices,
  networks: this.transformNetwork(),
  // serviceLimits: transformServiceLimits(), ??????
  serviceNotes: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].notes?.join('\n'),
  serviceType: "" // >>>>
};

const transformNetwork = () => {

   benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].situations[0].networks.map((network) => {
      return {
          costShares: network.costshares,
          networkType: network.type,
          priorAuthorization: network.precertRequired,
          deductibleApplies: network.deductibleApplies,
          serviceLocation: benefitDetails.benefitResults[0].serviceCategory[0].services[0].service[0].situations[0].pos.map((placeOfService) => placeOfService.posDesc ).join(',')
          
      }
   })
}

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