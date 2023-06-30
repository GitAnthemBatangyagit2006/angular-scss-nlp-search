import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { IsOptional } from 'class-validator';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from './app.service';
import { IWindow } from './interfaces/Window';
import {
  nlpDetails,
  mockBenefitDetails,
} from './nlp/details/benefitNLPSearchDetailsModel';
import { BenefitSummaryFilterType, CoverageTypeCode, NetworkType } from './nlp/summary/benefitNLP';
import { BenefitNLPSearchSummaryModel } from './nlp/summary/benefitNLPSearchSummaryModel';

export class Test {
  @IsOptional()
  prop: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: any;

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
  constructor(  private summaryModel: BenefitNLPSearchSummaryModel) {
    console.log('fdfd');
    this.summaryModel.transformBenefitSummaryToModel
    const transformBenefitSummaryRequest = {
      nlpBenefitsSummarySearchResult: this.benefitSummaryResponse,
      contractUid: '9856396FB58D00B4C75EC0A892FA7937',
      effectiveDate: '2023-01-01',
      filterKeys: this.filterKeys
    };
    //const response = this.summaryModel.transformBenefitSummaryToModel(transformBenefitSummaryRequest);
    //console.log(response)
  }

  ngOnInit() {}
}
