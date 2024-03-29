import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  toolTip: { [key: string]: string };
  noBenefitSummaryMessage: string;
  showLess: string,
  showMore: string,
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
  model = {
    serviceNote: '',
    selectedNetwork : {
      benefitSummary: ''
    }
  }


  content: content = {
    toolTip: {
      innetwork: 'James',
      outofnetwork: 'my tooltipxxxx',
    },
    noBenefitSummaryMessage: '',
    showMore: 'show more',
    showLess: 'Show Less'
  };

  @ViewChild('nlpSearchSummaryFilterTag', { static: false })
  nlpSearchSummaryFilterTag!: BenefitNLPFilterTagsMainComponent;

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

    this.content.noBenefitSummaryMessage = ` <div class="nlp-no-benefit-summary-icon">
    <span class="motif-icon motif-search-1"></span>
 </div>
 <h3 class="nlp-no-benefit-summary-message-line1">
   We couldn’t find results for &ldquo;##KEYWORD##&rdquo;
 </h3>
 <p class="nlp-no-benefit-summary-message-line2">

   Please check your spelling or try a different search term. <br />You can also check out the categories below.
 </p>`;
 
    this.model.serviceNote = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It`;
    this.content.showMore = 'show more',
    this.content.showLess = 'Show Less'

    this.model.selectedNetwork.benefitSummary = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It `;
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
    console.log('fdfd');
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  test(targetFilter: BenefitSummaryFilter) {
    console.log(targetFilter);
  }
}
