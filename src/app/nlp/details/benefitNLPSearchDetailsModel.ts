import * as Nlp from './benefitNLPSearchDetailsModel10x';

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
  transform(benefitDetails: Nlp.BenefitDetailsResponseDTO) {
    const service = benefitDetails.serviceCategory[0]?.services[0]?.service[0];

    if (!service) {
      return;
    }
    const categoryName =
      benefitDetails.serviceCategory[0].services[0].categoryNm;
    const benefitDetailsModel: Nlp.NlpBenefitsSummaryDetails = {
      benefit: {
        description: service.benefitDesc || 'NA',
        name: service.benefitNm,
        systemId: benefitDetails.benefitSysId,
      },
      category: categoryName,
      excludedServices: service.excludedServices,
      includedServices: service.includedServices,
      networks: this.transformNetwork(service.situations[0]),
      serviceNote: service.notes.join(''),
      serviceLimit: undefined,
      serviceType: '',
    };

    return benefitDetailsModel;
  }

  transformCostShares(
    costShares: Nlp.BenefitDetailsCostShares[]
  ): Nlp.CostShareInformation[] {
    return costShares.map((costShare: Nlp.BenefitDetailsCostShares) => {
      const costShareInfo: Nlp.CostShareInformation = {
        name: costShare.type,
        value: costShare.value,
        remaining: costShare.remaining,
        spent: costShare.accumulated,
      };
      return costShareInfo;
    });
  }

  transformNetwork(
    situations: Nlp.BenefitDetailsSituations
  ): Nlp.BenefitsNetwork[] {
    return (situations.networks || []).map(
      (network: Nlp.BenefitDetailsNetworks) => {
        const networks: Nlp.BenefitsNetwork = {
          costShares: this.transformCostShares(network.costshares),
          isPriorAuthorizationRequired:
            network.precertRequired === 'Yes' ||
            network.precertRequired === 'Y',
          isDeductibleApplied:
            network.deductibleApplies === 'Yes' ||
            network.precertRequired === 'Y',
            networkCode: {
              code: network.code,
              description: network.type
            },
          serviceLocations: situations.pos?.map(
            (placeOfService) => placeOfService.posDesc
          ),
          benefitSummary: network.benefitScript,
        };
        return networks;
      }
    );
  }
}
