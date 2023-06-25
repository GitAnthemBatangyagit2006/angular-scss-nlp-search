import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from '../../app.service';
import { IWindow } from '../../interfaces/Window';
import { BenefitDetailsRequest } from './benefitNLPSearchDetailsModel10x';
import { mockTranformedDetails1 } from './mockTransFormedObjects';
import * as Benefits from './benefitNLP';

@Component({
  selector: 'search-details',
  templateUrl: './benefitNLPSearchDetails.html',
  styleUrls: ['./benefitNLPSearchDetails.scss'],
})
export class BenefitNLPSearchDetailsComponent implements OnInit {
  model;
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

  constructor(
    private apiService: ApiService,
    @Inject('Window') private window: IWindow
  ) {}

  ngOnInit(): void {
    this.model = mockTranformedDetails1;
  }
}

export class BenefitNLPSearchDetailsModel
  implements Benefits.NlpBenefitsSummaryDetails
{
  benefit: Benefits.NlpBenefit;
  category: string;
  excludedServices: string[];
  includedServices: string[];
  networks: Benefits.BenefitsNetwork[];
  serviceNote: string;
  serviceType: string;
  serviceLimits: [
    {
      descripton: string;
      used: string;
      remaining: string;
    }
  ];
  selectedNetwork: Benefits.BenefitsNetwork;
  setSelectedNetwork = (
    selectedNetworkCode: Benefits.CodeDescription<string>
  ) => {
    return this.networks.find((network: Benefits.BenefitsNetwork) => {
      if (network.networkCode.code === selectedNetworkCode.code) {
        this.selectedNetwork = network;
        this.setServiceLimits(network.costShares);
      }
    });
  };

  // Will replace this with ENUM  that be defined in sydney/model
  setServiceLimits(costshares: Benefits.NlpCostShareInformation[]) {
    costshares.map((costshare: Benefits.NlpCostShareInformation) => {
      if (costshare.name.toLowerCase() === 'limit') {
        return {
          description: costshare.value,
          spent: costshare.spent,
          remaining: costshare.remaining,
        };
      }
    });
  }
}
