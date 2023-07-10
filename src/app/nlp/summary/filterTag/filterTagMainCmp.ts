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
  filterTags = new Map<string, FilterTag>();
  currentFilterTagIndex = -1;


  @ViewChild(FilterTagDirective, { static: true })
  filterTagDirective!: FilterTagDirective;

  addFilterTag(filterTag: FilterTag) {
    this.currentFilterTagIndex += 1;
    filterTag.index = this.currentFilterTagIndex;
    //Remove this
    filterTag.description = filterTag.description + this.currentFilterTagIndex;

    const filterItem = new FilterItem(FilterTagComponent, filterTag);
    const componentRef =
      this.filterTagDirective.viewContainerRef.createComponent<FilterTagComponent>(
        filterItem.component
      );

    componentRef.instance.filterTag = filterItem.filterTag;
    componentRef.instance.removeFilterTag.subscribe((filterTag: any) => {
      this.removeFilterTag(filterTag);
    });
    filterTag.componentReference = componentRef;

    this.filterTags.set(filterTag.description, filterTag);
  }

  removeFilterTag(filterTag: FilterTag) {
    filterTag.componentReference.destroy();
  }
}
