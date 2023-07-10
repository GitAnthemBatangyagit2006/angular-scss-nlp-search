import {
  Component,
  EventEmitter,
  Output,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { BenefitSummaryFilter } from '../benefitNLP';
import { BenefitNLPFilterTagComponent } from '../filterTag/benefitNLPFilterTagCmp';
import { BenefitNLPFilterItem } from '../filterTag/benefitNLPFilterItem';
import { FilterTagDirective } from '../filterTag/filterTagDirective';

@Component({
  styleUrls: ['./benefitNLPFilterTags.scss'],
  selector: '[nlp-summary-filter],nlp-summary-filter',
  template: `
  <div >
    <h3>Filters</h3>
    <div class="nlp-filter-tags-container">
      <ng-template [filter-tag]></ng-template>
    </div>
  </div>
`,
})
export class BenefitNLPFilterTagsMainComponent {
  @Output() filterTagRemoved = new EventEmitter();

  filterTags = new Map<string, BenefitSummaryFilter>();
  currentFilterTagIndex = -1;

  @ViewChild(FilterTagDirective, { static: true })
  filterTagDirective!: FilterTagDirective;

  addFilterTag(benefitSummaryFilter: BenefitSummaryFilter) {
    const filterItem = new BenefitNLPFilterItem(
      BenefitNLPFilterTagComponent,
      benefitSummaryFilter
    );

    const componentRef =
      this.filterTagDirective.viewContainerRef.createComponent(
        BenefitNLPFilterTagComponent
      );
    componentRef.instance.benefitSummaryFilter =
      filterItem.benefitSummaryFilter;
    componentRef.instance.benefitSummaryFilter.tagComponentReference =
      componentRef;

    componentRef.instance.removeFilterTag.subscribe((filterTag: any) => {
      this.removeFilterTag(filterTag, false);
    });

    this.filterTags.set(
      componentRef.instance.benefitSummaryFilter.value,
      componentRef.instance.benefitSummaryFilter
    );
  }

  toggleFilterTag(selectedFilterTag: BenefitSummaryFilter) {
    const matchingFilterTag = this.filterTags.get(selectedFilterTag.value);
    if (!selectedFilterTag.selected && matchingFilterTag) {
      this.removeFilterTag(matchingFilterTag, true);
    } else {
      this.addFilterTag(selectedFilterTag);
    }
  }

  removeFilterTag(benefitSummaryFilter: BenefitSummaryFilter, noEmit: boolean) {
    benefitSummaryFilter.tagComponentReference.destroy();
    benefitSummaryFilter.selected = false;
    if (!noEmit) {
      this.filterTagRemoved.emit(benefitSummaryFilter);
    }
  }

  deleteAllFilterTags() {
    this.filterTags.forEach((filter: BenefitSummaryFilter) => {
      filter.tagComponentReference.destroy();
      filter.selected = false;
    });
    this.filterTags.clear();
  }
}
