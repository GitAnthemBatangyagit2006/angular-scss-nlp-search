import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { BenefitSummaryFilter, FilterTag } from '../benefitNLP';
import { FilterItem } from '../filterTag/filterItemCmp';
import { FilterTagComponent } from '../filterTag/filterTagCmp';
import { FilterTagDirective } from '../filterTag/filterTagDirective';

@Component({
  styleUrls: ['filterTags.scss'],
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
export class FilterTagMainComponent {
  @Output() filterTagRemoved = new EventEmitter();

  filterTags = new Map<string, BenefitSummaryFilter>();
  currentFilterTagIndex = -1;

  @ViewChild(FilterTagDirective, { static: true })
  filterTagDirective!: FilterTagDirective;

  addFilterTag(benefitSummaryFilter: BenefitSummaryFilter) {
    const filterItem = new FilterItem(FilterTagComponent, benefitSummaryFilter);
    const componentRef =
      this.filterTagDirective.viewContainerRef.createComponent<FilterTagComponent>(
        filterItem.component
      );

    componentRef.instance.benefitSummaryFilter =
      filterItem.benefitSummaryFilter;
    componentRef.instance.benefitSummaryFilter.tagComponentReference =
      componentRef;

    componentRef.instance.removeFilterTag.subscribe((filterTag: any) => {
      this.removeFilterTag(filterTag, false);
    });

    this.filterTags.set(componentRef.instance.benefitSummaryFilter.value, componentRef.instance.benefitSummaryFilter );
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
   this.filterTags.forEach( (filter: BenefitSummaryFilter) => {
     filter.tagComponentReference.destroy();
     filter.selected = false;
   })
   this.filterTags.clear();
  }
}
