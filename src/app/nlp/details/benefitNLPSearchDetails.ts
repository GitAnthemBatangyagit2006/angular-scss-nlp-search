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
import { mock10xRawDetails1WithAccums, mockTranformedDetails1 } from './mockTransFormedObjects';
import * as Benefits from './benefitNLP';
import { nlpDetails } from './benefitNLPSearchDetailsModel';

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

    
    const nlp = new nlpDetails();
    // there are fields not define in our DTO sydney model.
    const mockTranformedDetailsForUI = nlp.transformResponseToNlpBenefitsSummaryDetails(mock10xRawDetails1WithAccums);
    this.model = new BenefitNLPSearchDetailsModel();
    this.model.transform(mockTranformedDetailsForUI, {code: 'INN'});
  }
}

export type ServiceLimit = {
  description: string;
  used?: string | number;
  remaining?: string | number;
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
  serviceLimits: ServiceLimit[] = [];

  selectedNetwork: Benefits.BenefitsNetwork;
  setSelectedNetwork = (
    selectedNetworkCode?: Benefits.CodeDescription<string>
  ) => {
    return this.networks.find((network: Benefits.BenefitsNetwork) => {
 
      if (network.networkCode.code === selectedNetworkCode.code) {
        this.selectedNetwork = network;
        this.setServiceLimits(network.costShares);
        console.log(this.serviceLimits);
      }
    });
  };

  /*
   Will replace this with ENUM  that will be defined in sydney/model.
   The service limits can bet set only for login user. Need to call again the API to retrieve
   the limits for other members (solution need to discuss further).
  */ 
  setServiceLimits(costshares: Benefits.NlpCostShareInformation[]) {
    costshares.map((costshare: Benefits.NlpCostShareInformation) => {

      if (costshare.name.toLowerCase() === 'limit') {
        this.serviceLimits.push( {
          description: costshare.value,
          used: costshare.spent,
          remaining: costshare.remaining,
        });
      }
    });
  }

  transform(benefitDetails:  Benefits.NlpBenefitsSummaryDetails, selectedNetworkCode: Benefits.CodeDescription<string>) {
    this.benefit  = benefitDetails.benefit;
    this.category = benefitDetails.category;
    this.excludedServices =  benefitDetails.excludedServices;
    this.includedServices =  benefitDetails.includedServices;
    this.networks = benefitDetails.networks;
    this.serviceNote = benefitDetails.serviceNote;
    this.serviceType = benefitDetails.serviceType;
    this.setSelectedNetwork(selectedNetworkCode);
  }
}
