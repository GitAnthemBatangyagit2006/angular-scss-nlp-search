import { Component, ElementRef, HostListener, Inject, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from '../../app.service';
import { IWindow } from '../../interfaces/Window';
import { BenefitSummarySearchResult } from './benefitNLP';

@Component({
  selector: 'search-summary',
  templateUrl: './benefitNLPSearchSummary.html',
  styleUrls: ['./benefitNLPSearchSummary.scss'],
})
export class BenefitNLPSearchSummaryComponent implements OnInit {
  benefitNLPSearchSummaryData: BenefitSummarySearchResult | undefined;
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
    private api: ApiService,
    @Inject('Window') private window: IWindow,
    private currentComponent: ElementRef
  ) {}

  ngOnInit() {
   
  }

}
