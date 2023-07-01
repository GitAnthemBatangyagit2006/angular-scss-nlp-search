import { BenefitSummaryFilterType, CoverageTypeCode, NetworkType } from "./benefitNLP";

export const filterKeys = [
  {
    type: BenefitSummaryFilterType.NETWORK,
    value: NetworkType.IN_NETWORK,
    selected: true
  }
];

export const benefitSummaryResponse = {
  benefitsSummaries: [
    {
      benefit: {
        name: 'Allergy Treatment',
        description: 'NA',
        systemId: '034b4f80-05af-407e-a599-75cbf918abe9'
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%'
          },
          {
            name: 'Copayment',
            value: 'Not Applicable'
          }
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network'
        },
        serviceLocations: ['Office']
      }
    },
    {
      benefit: {
        name: 'Allergy Treatment',
        description: 'NA',
        systemId: '034b4f80-05af-407e-a599-75cbf918abe9'
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '50%'
          },
          {
            name: 'Copayment',
            value: 'Not Applicable'
          }
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network'
        },
        serviceLocations: ['Office']
      }
    },
    {
      benefit: {
        name: 'Allergy Testing',
        description: 'NA',
        systemId: '65d9a541-a1c1-4bd8-b46c-e0580f8dc758'
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%'
          },
          {
            name: 'Copayment',
            value: 'Not Applicable'
          }
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network'
        },
        serviceLocations: ['Office']
      }
    },
    {
      benefit: {
        name: 'Allergy Testing',
        description: 'NA',
        systemId: '65d9a541-a1c1-4bd8-b46c-e0580f8dc758'
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '50%'
          },
          {
            name: 'Copayment',
            value: 'Not Applicable'
          }
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network'
        },
        serviceLocations: ['Office']
      }
    }
  ],
  documentId: '190711534958-01012023'
};