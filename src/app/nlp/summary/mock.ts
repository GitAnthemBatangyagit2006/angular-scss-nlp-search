import {
  BenefitSummaryFilterType,
  CoverageTypeCode,
  NetworkType,
NlpBenefitsSummarySearchResult,
} from './benefitNLP';

export const filterKeys = [
  {
    type: BenefitSummaryFilterType.NETWORK,
    value: NetworkType.IN_NETWORK,
    selected: true,
  },
];

export const benefitSummaryResponse: NlpBenefitsSummarySearchResult = {
  benefitsSummaries: [
    {
      benefit: {
        name: 'Allergy Treatment',
        description: 'NA',
        systemId: '034b4f80-05af-407e-a599-75cbf918abe9',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Office'],
      },
    },
    {
      benefit: {
        name: 'Allergy Treatment',
        description: 'NA',
        systemId: '034b4f80-05af-407e-a599-75cbf918abe9',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '50%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Office'],
      },
    },
    {
      benefit: {
        name: 'Allergy Testing',
        description: 'NA',
        systemId: '65d9a541-a1c1-4bd8-b46c-e0580f8dc758',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Office'],
      },
    },
    {
      benefit: {
        name: 'Allergy Testing',
        description: 'NA',
        systemId: '65d9a541-a1c1-4bd8-b46c-e0580f8dc758',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '50%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Office'],
      },
    },
  ],
  documentId: '190711534958-01012023',
};

export const benefitSummaryresponse2: NlpBenefitsSummarySearchResult = {
  benefitsSummaries: [
    {
      benefit: {
        name: 'Organ Transplants (Professional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: 'decce106-e7af-4188-adce-bdb5ef917888',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Professional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: 'decce106-e7af-4188-adce-bdb5ef917888',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Professional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '4f2b3e41-b7ba-40b5-9032-43e22096de97',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Professional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '4f2b3e41-b7ba-40b5-9032-43e22096de97',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Applicable',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Institutional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '2de7c3b4-0544-4211-a81c-08f125293fc5',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'BDC PLUS Facility',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Institutional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '2de7c3b4-0544-4211-a81c-08f125293fc5',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN1',
          description: 'BDC Facility',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Institutional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '2de7c3b4-0544-4211-a81c-08f125293fc5',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Applicable',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Institutional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '1387aa8d-26a0-47a7-8243-5f5f8a33b4c7',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Organ Transplants (Institutional)',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '1387aa8d-26a0-47a7-8243-5f5f8a33b4c7',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Bone Marrow Donor Search Fee',
        description:
          'The Bone Marrow Donor Search Fee covers the expenses of finding a suitable donor through registries and tests.',
        systemId: '90a991ae-d279-4c40-a645-b8f16ccb7157',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Bone Marrow Donor Search Fee',
        description:
          'The Bone Marrow Donor Search Fee covers the expenses of finding a suitable donor through registries and tests.',
        systemId: '90a991ae-d279-4c40-a645-b8f16ccb7157',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Live Donor Health Services',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: 'c3a35b77-888a-4bc7-8069-239c3f510dbd',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Live Donor Health Services',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: 'c3a35b77-888a-4bc7-8069-239c3f510dbd',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Applicable',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Travel and Lodging for Organ Transplants',
        description:
          'Travel and lodging for medical care or surgery means making arrangements to travel and finding a place to stay while getting medical treatment or having surgery away from home. It involves planning transportation and finding a comfortable place to stay.',
        systemId: '7f9de773-2517-4776-be73-fa1329bf8d1a',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '0%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Travel and Lodging for Organ Transplants',
        description:
          'Travel and lodging for medical care or surgery means making arrangements to travel and finding a place to stay while getting medical treatment or having surgery away from home. It involves planning transportation and finding a comfortable place to stay.',
        systemId: '7f9de773-2517-4776-be73-fa1329bf8d1a',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Applicable',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Live Donor Health Services',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '5ea078d3-3cff-4f4e-b83f-7e770949cd9f',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Live Donor Health Services',
        description:
          "A transplant is a medical procedure where a diseased or damaged organ is replaced with a healthy organ from a donor. It's typically done to save a life or improve the quality of life.",
        systemId: '5ea078d3-3cff-4f4e-b83f-7e770949cd9f',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Bone Marrow Donor Search Fee',
        description:
          'The Bone Marrow Donor Search Fee covers the expenses of finding a suitable donor through registries and tests.',
        systemId: '9231cfc8-2c4d-4b82-b869-43a4d6c2716e',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: '30%',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: true,
        isPriorAuthorizationRequired: true,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Bone Marrow Donor Search Fee',
        description:
          'The Bone Marrow Donor Search Fee covers the expenses of finding a suitable donor through registries and tests.',
        systemId: '9231cfc8-2c4d-4b82-b869-43a4d6c2716e',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Applicable',
          },
          {
            name: 'Copayment',
            value: 'Not Applicable',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Blue Distinction Center Transplant  Facility'],
      },
    },
    {
      benefit: {
        name: 'Travel and Lodging for Organ Transplants',
        description:
          'Travel and lodging for medical care or surgery means making arrangements to travel and finding a place to stay while getting medical treatment or having surgery away from home. It involves planning transportation and finding a comfortable place to stay.',
        systemId: '977ab90b-d142-4b84-b4e2-843dceefcc22',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'INN',
          description: 'In Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
    {
      benefit: {
        name: 'Travel and Lodging for Organ Transplants',
        description:
          'Travel and lodging for medical care or surgery means making arrangements to travel and finding a place to stay while getting medical treatment or having surgery away from home. It involves planning transportation and finding a comfortable place to stay.',
        systemId: '977ab90b-d142-4b84-b4e2-843dceefcc22',
      },
      coverageType: CoverageTypeCode.MEDICAL,
      network: {
        costShares: [
          {
            name: 'Coinsurance',
            value: 'Not Covered',
          },
          {
            name: 'Copayment',
            value: 'Not Covered',
          },
        ],
        isDeductibleApplied: false,
        isPriorAuthorizationRequired: false,
        networkCode: {
          code: 'OON',
          description: 'Out of Network',
        },
        serviceLocations: ['Non BDCT Facility'],
      },
    },
  ],
  documentId: '190711534958-01012023',
};
