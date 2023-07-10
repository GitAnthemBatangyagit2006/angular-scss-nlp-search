import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import {
  BenefitSummaryFilter,
  BenefitSummaryFilterType,
  BenefitSummarySearchResult,
  CoverageTypeCode,
  NetworkType,
} from './nlp/summary/benefitNLP';
import { BenefitNLPSearchSummaryModel } from './nlp/summary/benefitNLPSearchSummaryModel';
import { FilterTagComponent } from './nlp/summary/filterTag/filterTagCmp';
import { FilterTagMainComponent } from './nlp/summary/filterTag/filterTagMainCmp';
import {
  benefitSummaryResponse,
  benefitSummaryresponse2,
  filterKeys,
} from './nlp/summary/mock';

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

  @ViewChild('nlpFilter', { static: true }) filterTag!: FilterTagMainComponent;

  constructor(
    public benefitNLPSearchSummaryModel: BenefitNLPSearchSummaryModel
  ) {}

  ngOnInit() {
    this.benefitNLPSearchSummaryModel.transformBenefitSummaryToModel;
    const transformBenefitSummaryRequest = {
      nlpBenefitsSummarySearchResult: benefitSummaryresponse2,
      contractUid: '9856396FB58D00B4C75EC0A892FA7937',
      effectiveDate: '2023-01-01',
      filterKeys: filterKeys,
    };
    this.benefitNLPSearchSummaryData =
      this.benefitNLPSearchSummaryModel.transformBenefitSummaryToModel(
        transformBenefitSummaryRequest
      );
    console.log(this.benefitNLPSearchSummaryData.filteredBenefitSummary);

    //populate filter ags
    this.populateFilterTags();
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
            !(
              filter.value == targetFilter.value &&
              filter.type === targetFilter.type
            )
        );
    } else {
      this.benefitNLPSearchSummaryData.selectedFilters.push(targetFilter);
    }
    console.log(
      `filter`,
      this.benefitNLPSearchSummaryData.selectedFilters.length
    );
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );

    this.filterTag.toggleFilterTag(targetFilter);
    console.log(
      `filtered list`,
      this.benefitNLPSearchSummaryData.filteredBenefitSummary
    );
  }

  populateFilterTags() {
    this.benefitNLPSearchSummaryData?.filters.forEach((filter) => {
      if (filter.selected) {
        this.filterTag.addFilterTag(filter);
      }
    });
  }

  deSelectFilter(selectedFilter: BenefitSummaryFilter) {
    console.log(selectedFilter.selected);
    this.toggleFilter(selectedFilter);
  }

  deleteAllFilterTags() {
    this.filterTag.deleteAllFilterTags();
    this.benefitNLPSearchSummaryData.selectedFilters.length = 0;
    this.benefitNLPSearchSummaryData.filteredBenefitSummary =
      this.benefitNLPSearchSummaryModel.filterBenefitSummary(
        this.benefitNLPSearchSummaryData.benefitSummary,
        this.benefitNLPSearchSummaryData.selectedFilters
      );
  }
}
