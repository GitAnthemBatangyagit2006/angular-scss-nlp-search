export const mockTranformedDetails1 = {
  benefit: {
    name: 'Hello world',
    description: 'Live Donor Health Services',
    systemId: '23f17bfa-1b39-449a-8723-624ff57e0165',
  },
  category: 'Transplants - (BDCT Facility)',
  excludedServices: [],
  includedServices: [
    'Chemotherapy',
    'Hemodialysis',
    'Occupational Therapy',
    'Physical Therapy',
    'Radiation Therapy',
    'Speech Therapy',
  ],
  networks: [
    {
      costShares: [
        { name: 'Coinsurance', value: '10%' },
        { name: 'Copayment', value: 'Not Applicable' },
        { name: 'Limit', value: '90 Days Per Transplant' },
      ],
      isPriorAuthorizationRequired: true,
      isDeductibleApplied: true,
      networkName: 'In Network',
      serviceLocations: ['Blue Distinction Center Transplant Facility'],
    },
    {
      costShares: [
        { name: 'Coinsurance', value: 'Not Applicable' },
        { name: 'Copayment', value: 'Not Applicable' },
      ],
      isPriorAuthorizationRequired: false,
      isDeductibleApplied: false,
      networkName: 'Out of Network',
      serviceLocations: ['Blue Distinction Center Transplant Facility'],
    },
  ],
  serviceNote:
    '\n\n##Cost-Share\n\nOther in-network transplant facilities can be utilized if a COE/BDCT facility is not available for a particular transplant (e.g., cornea, kidney, intestinal and certain multiple organ transplants) as long as the transplant has been approved by Utilization Management.\n\n##Cost-Share\n\nPenalty - No Precert on File : If claims are not pre-certified they will be denied as not covered. Once information is received claims can be re-opened based on medical information provided.\n\n##Cost-Share\n\nPenalty - Not Medically Necessary : If you do not obtain the required Pre-certification, you are responsible for all charges of services Anthem determines are not medically necessary.',
  serviceType: '',
};
