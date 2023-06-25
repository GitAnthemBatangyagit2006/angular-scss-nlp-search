export const mockTranformedDetails1 = {
  benefit: {
    description: 'NA',
    name: 'Physical Therapy Office Professional',
    systemId: '01e8c7a7-6cf9-4176-8b6e-c4ab84a2d2f4',
  },
  category: 'Therapies',
  excludedServices: ['Message therapist'],
  includedServices: [
    'CMT',
    'LMT',
    'PT',
    'acupuncture',
    'acupuncturist',
    'chiro',
    'chiropractor',
    'physical therapist.',
  ],
  networks: [
    {
      costShares: [
        { name: 'Coinsurance', value: '0%' },
        { name: 'Copayment', value: '$20 Per Visit' },
      ],
      isPriorAuthorizationRequired: false,
      isDeductibleApplied: false,
      networkCode: { code: 'INN', description: 'In Network' },
      serviceLocations: ['Office'],
    },
    {
      costShares: [
        { name: 'Coinsurance', value: '30%' },
        { name: 'Copayment', value: 'Not Applicable' },
      ],
      isPriorAuthorizationRequired: false,
      isDeductibleApplied: true,
      networkCode: { code: 'OON', description: 'Out of Network' },
      serviceLocations: ['Office'],
    },
  ],
  serviceNote:
    '\n\n##Cost-Share\n\nFor chiro, acupuncture, PT it is covered but by itself. CMT and LMT are only covered if they are covered, licensed provider in coordination with the above benefits.\n\n##Cost-Share\n\nA massage therapist is not covered specialty. Massage therapy is covered when performed by a chiropractor, acupuncturist and/or a physical therapist.',
  serviceType: '',
};
