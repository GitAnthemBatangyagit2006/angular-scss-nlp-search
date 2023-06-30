import { Component, ElementRef, HostListener, Inject, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from '../../app.service';
import { IWindow } from '../../interfaces/Window';
import { BenefitSummaryFilter, BenefitSummaryFilterType, BenefitSummarySearchResult, CoverageTypeCode, NetworkType } from './benefitNLP';
import { BenefitNLPSearchSummaryModel } from './benefitNLPSearchSummaryModel';


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

   filterKeys = [
    {
      type: BenefitSummaryFilterType.NETWORK,
      value: NetworkType.IN_NETWORK,
      selected: true
    }
  ];

  benefitSummaryResponse = {
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

  constructor(
    private apiService: ApiService,
    @Inject('Window') private window: IWindow,
    private summaryModel: BenefitNLPSearchSummaryModel
  ) {}

  ngOnInit() {
    this.summaryModel.transformBenefitSummaryToModel
    const transformBenefitSummaryRequest = {
      nlpBenefitsSummarySearchResult: this.benefitSummaryResponse,
      contractUid: '9856396FB58D00B4C75EC0A892FA7937',
      effectiveDate: '2023-01-01',
      filterKeys: this.filterKeys
    };
    const response = this.summaryModel.transformBenefitSummaryToModel(transformBenefitSummaryRequest);
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
