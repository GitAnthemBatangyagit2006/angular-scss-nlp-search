export const mock10xRawDetails1WithAccums= {
  "benefitResults": [
      {
          "mcid": "326378610",
          "contractUID": "335E8957370545B46C9BA579E99A189A",
          "effectiveDt": "01012023",
          "benefitSysId": "82d68584-7a0d-420c-bde0-313d01ac27a7",
          "serviceCategory": [
              {
                  "planType": "Medical",
                  "services": [
                      {
                          "parentCategoryNm": "Others",
                          "categoryNm": "Durable Medical Equipment",
                          "service": [
                              {
                                  "benefitNm": "Hearing Aid Services",
                                  "srvcDefnId": [
                                      "HRGSRVPRF",
                                      "HRNGAID",
                                      "HRGSRVFAC",
                                      "HRGADSPRF",
                                      "HRGEVLFAC",
                                      "HRGEVLPRF",
                                      "HRGADSFAC"
                                  ],
                                  "notes": [
                                      "\n\n##Cost-Share\n\nHardware: Hearing Aids\n\n##Cost-Share\n\nLimit combined In- and Out-of-Network.\n\n##Cost-Share\n\nBone Anchored Hearing Aids are covered under DME.\n\n##Cost-Share\n\nHearing aid exams and accessories applies to the maximum (claims incurred on or after 1/1/19), Replacement parts, batteries and repairs are not covered."
                                  ],
                                  "includedServices": [
                                      "Hearing Aids",
                                      "Hearing aid exams"
                                  ],
                                  "excludedServices": [
                                      "Replacement parts",
                                      "batteries",
                                      "repairs"
                                  ],
                                  "situations": [
                                      {
                                          "pos": [
                                              {
                                                  "posDesc": "ALL"
                                              }
                                          ],
                                          "networks": [
                                              {
                                                  "code": "INN",
                                                  "type": "In Network",
                                                  "limitations": [
                                                      "Limit : $3000"
                                                  ],
                                                  "deductibleApplies": "Yes",
                                                  "precertRequired": "N",
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
                                                          "value": "$3000 Every 3 Years",
                                                          "accumName": "HRAIDMY",
                                                          "accumulated": "$15.08",
                                                          "remaining": "$2984.92",
                                                          "accumstartdt": "2023-01-01",
                                                          "accumenddt": "2025-12-31"
                                                      }
                                                  ]
                                              },
                                              {
                                                  "code": "OON",
                                                  "type": "Out of Network",
                                                  "limitations": [
                                                      "Limit : $3000"
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
                                                      },
                                                      {
                                                          "type": "Limit",
                                                          "value": "$3000 Every 3 Years",
                                                          "accumName": "HRAIDMY",
                                                          "accumulated": "$15.08",
                                                          "remaining": "$2984.92",
                                                          "accumstartdt": "2023-01-01",
                                                          "accumenddt": "2025-12-31"
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
      benefitSummary: 'Hello World'
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
      benefitSummary: 'Hello World'
    },
  ],
  serviceNote:
    '\n\n##Cost-Share\n\nFor chiro, acupuncture, PT it is covered but by itself. CMT and LMT are only covered if they are covered, licensed provider in coordination with the above benefits.\n\n##Cost-Share\n\nA massage therapist is not covered specialty. Massage therapy is covered when performed by a chiropractor, acupuncturist and/or a physical therapist.',
  serviceType: '',
};
