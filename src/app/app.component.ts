import {
  Component,
  OnInit,
} from '@angular/core';

import { BenefitSummaryFilter, BenefitSummaryFilterType, BenefitSummarySearchResult, CoverageTypeCode, NetworkType } from './nlp/summary/benefitNLP';
import { BenefitNLPSearchSummaryModel } from './nlp/summary/benefitNLPSearchSummaryModel';
import { benefitSummaryResponse, filterKeys } from './nlp/summary/mock';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filterType = BenefitSummaryFilterType
  model: BenefitSummarySearchResult;
  data: any;
  constructor(  public summaryModel: BenefitNLPSearchSummaryModel) {}

  ngOnInit() {

    this.summaryModel.transformBenefitSummaryToModel
    const transformBenefitSummaryRequest = {
      nlpBenefitsSummarySearchResult: benefitSummaryResponse,
      contractUid: '9856396FB58D00B4C75EC0A892FA7937',
      effectiveDate: '2023-01-01',
      filterKeys: filterKeys
    };
    this.model = this.summaryModel.transformBenefitSummaryToModel(transformBenefitSummaryRequest);
    console.log(this.model.filterBenefitSummary)
  }
  
  filter() {
    this.model.filterBenefitSummary = this.summaryModel.filteredBenefitSummary( this.model.benefitSummary,this.model.selectedFilters)

    console.log(this.model.selectedFilters);
    console.log(this.model.filterBenefitSummary)
  }

  toggleFilter(filter: BenefitSummaryFilter) {
    filter.selected = !filter.selected;
    // remove from the filter if unchecked
    if (!filter.selected) {
     this.model.selectedFilters = this.model.selectedFilters.filter((f) => f.value !== filter.value && f.type !== filter.type);
    } else {
      this.model.selectedFilters.push(filter);
    }
    this.model.filterBenefitSummary = this.summaryModel.filteredBenefitSummary( this.model.benefitSummary,this.model.selectedFilters);
    console.log( this.model.selectedFilters);
  }
}

