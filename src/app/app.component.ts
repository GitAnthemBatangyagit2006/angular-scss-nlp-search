import { Component, OnInit } from '@angular/core';

import {
  BenefitSummaryFilter,
  BenefitSummaryFilterType,
  BenefitSummarySearchResult,
  CoverageTypeCode,
  NetworkType,
} from './nlp/summary/benefitNLP';
import { BenefitNLPSearchSummaryModel } from './nlp/summary/benefitNLPSearchSummaryModel';
import { benefitSummaryResponse, filterKeys } from './nlp/summary/mock';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filterType = BenefitSummaryFilterType;
  benefitNLPSearchSummaryData: BenefitSummarySearchResult;
  data: any;
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
    if (!targetFilter.selected) {
      this.benefitNLPSearchSummaryData.selectedFilters =
        this.benefitNLPSearchSummaryData.selectedFilters.filter(
          (filter) =>
            filter.value !== targetFilter.value &&
            filter.type === targetFilter.type
        );
    } else {
      this.benefitNLPSearchSummaryData.selectedFilters.push(targetFilter);
    }
    console.log(this.benefitNLPSearchSummaryData.selectedFilters);
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );

    console.log(this.benefitNLPSearchSummaryData.filteredBenefitSummary);
  }
}
