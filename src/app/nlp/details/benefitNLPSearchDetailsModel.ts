import * as Nlp from './benefitNLPSearchDetailsModel10x';

export const mockBenefitDetails = {
  benefitResults: [
    {
      mcid: '326378610',
      contractUID: '335E8957370545B46C9BA579E99A189A',
      effectiveDt: '01012023',
      benefitSysId: '23f17bfa-1b39-449a-8723-624ff57e0165',
      serviceCategory: [
        {
          planType: 'Medical',
          services: [
            {
              parentCategoryNm: 'Others',
              categoryNm: 'Transplants - (BDCT Facility)',
              service: [
                {
                  benefitNm: 'Live Donor Health Services',
                  benefitDesc: 'Hello world',
                  srvcDefnId: [
                    'DONORPROF',
                    'UNRDNRFAC',
                    'DONORFAC',
                    'UNRDNRPRF',
                  ],
                  notes: [
                    '\n\n##Cost-Share\n\nOther in-network transplant facilities can be utilized if a COE/BDCT facility is not available for a particular transplant (e.g., cornea, kidney, intestinal and certain multiple organ transplants) as long as the transplant has been approved by Utilization Management.\n\n##Cost-Share\n\nPenalty - No Precert on File : If claims are not pre-certified they will be denied as not covered. Once information is received claims can be re-opened based on medical information provided.\n\n##Cost-Share\n\nPenalty - Not Medically Necessary : If you do not obtain the required Pre-certification, you are responsible for all charges of services Anthem determines are not medically necessary.',
                  ],
                  situations: [
                    {
                      pos: [
                        {
                          posCd: '',
                          posDesc:
                            'Blue Distinction Center Transplant  Facility',
                        },
                      ],
                      providerSpecialty: ['BD'],
                      networks: [
                        {
                          code: 'INN',
                          type: 'In Network',
                          limitations: ['Limit : 90 Days'],
                          deductibleApplies: 'Yes',
                          precertRequired: 'Y',
                          precertNotes: ['\n\nTRANSPLANTATION'],
                          costshares: [
                            {
                              type: 'Coinsurance',
                              value: '10%',
                            },
                            {
                              type: 'Copayment',
                              value: 'Not Applicable',
                            },
                            {
                              type: 'Limit',
                              value: '90 Days Per Transplant',
                            },
                          ],
                        },
                        {
                          code: 'OON',
                          type: 'Out of Network',
                          limitations: ['Limit : Not Applicable'],
                          precertRequired: 'Not Applicable',
                          costshares: [
                            {
                              type: 'Coinsurance',
                              value: 'Not Applicable',
                            },
                            {
                              type: 'Copayment',
                              value: 'Not Applicable',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  includedServices: [
                    'Chemotherapy',
                    'Hemodialysis',
                    'Occupational Therapy',
                    'Physical Therapy',
                    'Radiation Therapy',
                    'Speech Therapy',
                  ],
                  excludedServices: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

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
        name: service.benefitDesc,
        description: service.benefitNm,
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
