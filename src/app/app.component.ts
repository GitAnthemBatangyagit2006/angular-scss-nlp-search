import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import {
  BenefitSummaryFilter,
  BenefitSummaryFilterType,
  BenefitSummarySearchResult,
} from './nlp/summary/benefitNLP';
import { BenefitNLPSearchSummaryModel } from './nlp/summary/benefitNLPSearchSummaryModel';
import { BenefitNLPFilterTagsMainComponent } from './nlp/summary/filterTag/benefitNLPFilterTagsMainCmp';

import {
  benefitSummaryResponse,
  benefitSummaryresponse2,
  filterKeys,
} from './nlp/summary/mock';

export interface content {
  toolTip: {[key: string]: string}
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filterType = BenefitSummaryFilterType;
  benefitNLPSearchSummaryData: BenefitSummarySearchResult;
  data: any;
  changingValue: Subject<boolean> = new Subject();
  regspace = /\s+/g;
  
  content: content = {
     toolTip : {
    "innetwork": 'James',
    "outofnetwork": 'my tooltipxxxx',
  }
};

  @ViewChild('nlpSearchSummaryFilterTag', { static: false }) nlpSearchSummaryFilterTag!: BenefitNLPFilterTagsMainComponent;

  constructor(
    public benefitNLPSearchSummaryModel: BenefitNLPSearchSummaryModel
  ) {}

  ngOnInit() {
    this.benefitNLPSearchSummaryModel.transformBenefitSummaryToModel;
    const transformBenefitSummaryRequest = {
      nlpBenefitsSummarySearchResult: benefitSummaryResponse,
      contractUid: '9856396FB58D00B4C75EC0A892FA7937',
      effectiveDate: '2023-01-01',
      filterKeys: filterKeys,
    };
    this.benefitNLPSearchSummaryData =
      this.benefitNLPSearchSummaryModel.transformBenefitSummaryToModel(
        transformBenefitSummaryRequest
      );
    console.log(this.benefitNLPSearchSummaryData.filteredBenefitSummary);

  }

  filter() {
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );
    console.log(this.benefitNLPSearchSummaryData.selectedFilters);
    console.log(this.benefitNLPSearchSummaryData.filteredBenefitSummary);
  }

  toggleFilter(targetFilter: BenefitSummaryFilter) {
    // targetFilter.selected = !targetFilter.selected;
    // remove from the filter if unchecked
    console.log('fdfd')
    if (!targetFilter.selected) {
      this.benefitNLPSearchSummaryData.selectedFilters =
        this.benefitNLPSearchSummaryData.selectedFilters.filter(
          (filter) =>
            !(
              filter.value == targetFilter.value &&
              filter.type === targetFilter.type
            )
        );
    } else {
      this.benefitNLPSearchSummaryData.selectedFilters.push(targetFilter);
    }
    console.log(
      `filterx`,
      this.benefitNLPSearchSummaryData.selectedFilters.length
    );
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );
      
    // Use this if you are dynamically calling loading compoonent.
    //this.nlpSearchSummaryFilterTag.toggleFilterTag(targetFilter);

    console.log(
      `filtered list`,
      this.benefitNLPSearchSummaryData.filteredBenefitSummary.length
    );
  }

  populateFilterTags() {
    this.benefitNLPSearchSummaryData?.filters.forEach((filter) => {
      if (filter.selected) {
        this.nlpSearchSummaryFilterTag.addFilterTag(filter);
      }
    });
  }

  deSelectFilter(selectedFilter: BenefitSummaryFilter) {
    console.log(selectedFilter.selected);
    this.toggleFilter(selectedFilter);
  }

  clearAllFilters() {
    this.nlpSearchSummaryFilterTag.deleteAllFilterTags();
    this.benefitNLPSearchSummaryData.selectedFilters.length = 0;
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );
  }

 delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
