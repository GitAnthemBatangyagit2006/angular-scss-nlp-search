import { Component, ElementRef, HostListener, Inject, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from '../../app.service';
import { IWindow } from '../../interfaces/Window';
import { BenefitSummaryFilter, BenefitSummaryFilterType, BenefitSummarySearchResult } from './benefitNLP';
import { transformBenefitSummaryToModel } from './benefitNLPSearchSummaryModel';

@Component({
  selector: 'search-summary',
  templateUrl: './benefitNLPSearchSummary.html',
  styleUrls: ['./benefitNLPSearchSummary.scss'],
})
export class BenefitNLPSearchSummaryComponent implements OnInit {

  content = {
    title: 'Benefit Coverage',
    searchBar: {
      noMatchingKeywords: 'No medical service found for searched text.',
      inputKeywordAriaLabel: 'Enter 3 or more characters to start a search.',
      inputKeywordHint: 'Search by service or procedure...',
      showLess: 'Show Less',
      showMore: 'Show More',
      defaultCountOfKeywordsShown: 1,
      serviceTitle: '',
    },
    resultText: '2 result for',
    benefit: {
      copay: 'Copay',
      coinsurance: 'Coinsurance',
      deductibleApplies: 'Deductible Applies',
      priorAuthorization: 'Prior Authorization',
      viewDetailAnalyticTag: 'viewDetailAnalyticTag',
      viewDetailAriaLabel: 'viewDetailAriaLabel',
      viewDetails: 'View Details',
      saveforlater: 'Save for later',
    },
    filter: {
      title: 'Filter',
      clearAll: 'clear All',
      category: 'category',
      serviceLocation: 'service Location',
      network: 'Provider Network',
      clearAllAnalyticTag: 'clearAllAnalyticTag',
      clearAllAriaLabel: 'clearAllAriaLabel',
    },
    backToBenefits: 'Back To Benefits',
    backToBenefitsAnalyticTag: 'backToBenefitsAnalyticTag',
    backToBenefitsAriaLabel: 'backToBenefitsAriaLabel',
  };



  benefitNLPSearchSummaryData = {
  "contractUid": "6V4X",
  "dateOfServicepPlanType": "01012023",
  "benefitSummary": [
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Radiology / X-ray Professional Component - Professional",
      "placeOfService": [
        "Independent Laboratory",
        "Off Campus - Outpatient Hospital"
      ],
      "benefitDescription": "",
      "network": "In Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": true,
      "priorAuthorization": true
    },
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Radiology / X-ray Professional Component - Professional",
      "placeOfService": [
        "Independent Laboratory",
        "Off Campus - Outpatient Hospital"
      ],
      "benefitDescription": "",
      "network": "Specialty Participating Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": true,
      "priorAuthorization": true
    },
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Radiology / X-ray Professional Component - Professional",
      "placeOfService": [
        "Independent Laboratory",
        "Off Campus - Outpatient Hospital"
      ],
      "benefitDescription": "",
      "network": "Out of Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": false,
      "priorAuthorization": false
    },
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Urgent Care X-ray",
      "placeOfService": [
        "Urgent Care Facility"
      ],
      "benefitDescription": "",
      "network": "In Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": true,
      "priorAuthorization": false
    },
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Urgent Care X-ray",
      "placeOfService": [
        "Urgent Care Facility"
      ],
      "benefitDescription": "",
      "network": "Out of Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": false,
      "priorAuthorization": false
    }
  ],
  "filterBenefitSummary": [
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Radiology / X-ray Professional Component - Professional",
      "placeOfService": [
        "Independent Laboratory",
        "Off Campus - Outpatient Hospital"
      ],
      "benefitDescription": "",
      "network": "In Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": true,
      "priorAuthorization": true
    },
    {
      "documentId": "",
      "planType": "",
      "benefitSystemId": "",
      "benefitName": "Urgent Care X-ray",
      "placeOfService": [
        "Urgent Care Facility"
      ],
      "benefitDescription": "",
      "network": "In Network",
      "coPayment": "",
      "coInsurance": "",
      "deductibleApplies": true,
      "priorAuthorization": false
    }
  ],
  "filters": [
    {
      "type": "PLACE_OF_SERVICE",
      "value": "Independent Laboratory"
    },
    {
      "type": "PLACE_OF_SERVICE",
      "value": "Off Campus - Outpatient Hospital"
    },
    {
      "type": "NETWORK",
      "value": "In Network"
    },
    {
      "type": "NETWORK",
      "value": "Specialty Participating Network"
    },
    {
      "type": "NETWORK",
      "value": "Out of Network"
    },
    {
      "type": "PLACE_OF_SERVICE",
      "value": "Urgent Care Facility"
    }
  ],
  "benefitAssociatedDetails": {
    "benefitId": "",
    "planType": ""
  }
};


  d = {
  "benefitResults": [
      {
          "mcid": "311977782",
          "contractUID": "9856396FB58D00B4C75EC0A892FA7937",
          "contractCd": "1VR7",
          "docID": "190711534958-01012023",
          "effectiveDt": "01012023",
          "inquiryUsed": "Allergy",
          "serviceCategory": [
              {
                  "planType": "Medical",
                  "categories": [
                      {
                          "parentCategoryNm": "Others",
                          "services": [
                              {
                                  "categoryNm": "Allergy",
                                  "benefits": [
                                      {
                                          "benefitNm": "Allergy Treatment",
                                          "benefitSysID": "034b4f80-05af-407e-a599-75cbf918abe9",
                                          "situations": [
                                              {
                                                  "pos": [
                                                      {
                                                          "posCd": "11",
                                                          "posDesc": "Office"
                                                      }
                                                  ],
                                                  "networks": [
                                                      {
                                                          "code": "INN",
                                                          "type": "In Network",
                                                          "deductibleApplies": "N",
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
                                                      },
                                                      {
                                                          "code": "OON",
                                                          "type": "Out of Network",
                                                          "deductibleApplies": "N",
                                                          "precertRequired": "N",
                                                          "costshares": [
                                                              {
                                                                  "type": "Coinsurance",
                                                                  "value": "50%"
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
                              },
                              {
                                  "categoryNm": "Allergy",
                                  "benefits": [
                                      {
                                          "benefitNm": "Allergy Testing",
                                          "benefitSysID": "65d9a541-a1c1-4bd8-b46c-e0580f8dc758",
                                          "situations": [
                                              {
                                                  "pos": [
                                                      {
                                                          "posCd": "11",
                                                          "posDesc": "Office"
                                                      }
                                                  ],
                                                  "networks": [
                                                      {
                                                          "code": "INN",
                                                          "type": "In Network",
                                                          "deductibleApplies": "N",
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
                                                      },
                                                      {
                                                          "code": "OON",
                                                          "type": "Out of Network",
                                                          "deductibleApplies": "N",
                                                          "precertRequired": "N",
                                                          "costshares": [
                                                              {
                                                                  "type": "Coinsurance",
                                                                  "value": "50%"
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
  ]
}

  constructor(
    private apiService: ApiService,
    @Inject('Window') private window: IWindow,
  ) {}

  ngOnInit() {
    this.benefitNLPSearchSummaryData = transformBenefitSummaryToModel(this.d,'dfdf','fdfd',[],);
    //console.clear();
    //console.log(`rhad: ${JSON.stringify(resp)}`);
   
  }
  async getBenfitSummary() {
    const filterKeys: BenefitSummaryFilter[] = [
      {
        type: BenefitSummaryFilterType.NETWORK,
        value: 'In Network',
        selected: true,
      },
    ];

    /*
    this.apiService.getBenefitSummary('test').subscribe((response) => {
      console.log('data response', response);
      this.benefitNLPSearchSummaryData = transformBenefitSummaryToModel(
        response,
        '6V4X',
        '01012023',
        filterKeys
      );
      console.log(
        'this.benefitNLPSearchSummaryData',
        JSON.stringify(this.benefitNLPSearchSummaryData.filterBenefitSummary)
      );
    });
    */
    // eslint-disable-next-line no-console
  }
}
