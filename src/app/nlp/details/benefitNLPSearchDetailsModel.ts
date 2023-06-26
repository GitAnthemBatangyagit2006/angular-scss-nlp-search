import * as Nlp from './benefitNLPSearchDetailsModel10x';
import * as Benefits from './benefitNLP';

export const mockBenefitDetails = {
  "benefitResults": [
      {
          "mcid": "1100200000",
          "contractUID": "8627C0295F876E969D62C0F555E0AEAC",
          "effectiveDt": "02012023",
          "benefitSysId": "01e8c7a7-6cf9-4176-8b6e-c4ab84a2d2f4",
          "serviceCategory": [
              {
                  "planType": "Medical",
                  "services": [
                      {
                          "parentCategoryNm": "Others",
                          "categoryNm": "Therapies",
                          "service": [
                              {
                                  "benefitNm": "Physical Therapy Office Professional",
                                  "srvcDefnId": [
                                      "PHYSRTPRF"
                                  ],
                                  "notes": [
                                      "\n\n##Cost-Share\n\nFor chiro, acupuncture, PT it is covered but by itself. CMT and LMT are only covered if they are covered, licensed provider in coordination with the above benefits.\n\n##Cost-Share\n\nA massage therapist is not covered specialty. Massage therapy is covered when performed by a chiropractor, acupuncturist and/or a physical therapist."
                                  ],
                                  "includedServices": [
                                      "CMT",
                                      "LMT",
                                      "PT",
                                      "acupuncture",
                                      "acupuncturist",
                                      "chiro",
                                      "chiropractor",
                                      "physical therapist."
                                  ],
                                  "excludedServices": [
                                      "Message therapist"
                                  ],
                                  "situations": [
                                      {
                                          "pos": [
                                              {
                                                  "posCd": "11",
                                                  "posDesc": "Office"
                                              }
                                          ],
                                          "diagnosisCd": [
                                              "PHYSTHERDX"
                                          ],
                                          "networks": [
                                              {
                                                  "code": "INN",
                                                  "type": "In Network",
                                                  "limitations": [
                                                      "Limit : Not Applicable"
                                                  ],
                                                  "deductibleApplies": "No",
                                                  "precertRequired": "N",
                                                  "costshares": [
                                                      {
                                                          "type": "Coinsurance",
                                                          "value": "0%"
                                                      },
                                                      {
                                                          "type": "Copayment",
                                                          "value": "$20 Per Visit"
                                                      }
                                                  ]
                                              },
                                              {
                                                  "code": "OON",
                                                  "type": "Out of Network",
                                                  "limitations": [
                                                      "Limit : Not Applicable"
                                                  ],
                                                  "deductibleApplies": "Yes",
                                                  "precertRequired": "N",
                                                  "costshares": [
                                                      {
                                                          "type": "Coinsurance",
                                                          "value": "30%"
                                                      },
                                                      {
                                                          "type": "Copayment",
                                                          "value": "Not Applicable"
                                                      }
                                                  ]
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              }
          ]
      }
  ]
}

export class nlpDetails {
  
 transformResponseToNlpBenefitsSummaryDetails(benefitsDetailsResponse: Nlp.BenefitDetailsResponseDTO): Benefits.NlpBenefitsSummaryDetails {
    
    const service = benefitsDetailsResponse.benefitResults[0]?.serviceCategory[0]?.services[0]?.service[0];
    const categoryName = benefitsDetailsResponse.benefitResults[0]?.serviceCategory[0]?.services[0].categoryNm;
    const benefitSystemId = benefitsDetailsResponse.benefitResults[0].benefitSysId;
    const benefitDetailsModel: Benefits.NlpBenefitsSummaryDetails = {
      benefit: {
        description: service.benefitDesc || 'NA', // this field will be mandatory in august, 'NA' in July 2023 in dark.
        name: service.benefitNm,
        systemId: benefitSystemId
      },
      category: categoryName,
      excludedServices: service.excludedServices,
      includedServices: service.includedServices,
      networks: this.transformNetwork(service.situations[0]),
      serviceNote: service.notes.join(''),
      serviceType: ''
    };
    return benefitDetailsModel;
  }

  private transformCostShares(costShares: Nlp.BenefitDetailsCostShares[]): Benefits.NlpCostShareInformation[] {
    return costShares.map((costShare: Nlp.BenefitDetailsCostShares) => {
      const costShareInfo: Benefits.NlpCostShareInformation = {
        name: costShare.type,
        value: costShare.value,
        remaining: costShare.remaining,
        spent: costShare.accumulated
      };
      return costShareInfo;
    });
  }

  private transformNetwork(situations: Nlp.BenefitDetailsSituations): Benefits.BenefitsNetwork[] {
    return (situations.networks || []).map((network: Nlp.BenefitDetailsNetworks) => {

      const networks: Benefits.BenefitsNetwork = {
        costShares: this.transformCostShares(network.costshares),
        isPriorAuthorizationRequired: network.precertRequired === 'Yes' || network.precertRequired === 'Y',
        isDeductibleApplied: network.deductibleApplies === 'Yes' || network.precertRequired === 'Y',
        networkCode: {
          code: network.code,
          description: network.type
        },
        serviceLocations: situations.pos?.map((placeOfService) => placeOfService.posDesc),
        benefitSummary: network.benefitScript
      };
      return networks;
    });
  }
}
