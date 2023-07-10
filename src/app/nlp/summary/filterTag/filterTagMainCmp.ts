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
    <!--
      <ng-template [filter-tag]></ng-template>
    -->  
      <ng-container #filterTagsContainer></ng-container>
    </div>
  </div>
`,
})
export class FilterTagMainComponent implements OnInit {
  @Output()
  addTag = new EventEmitter();

  @Input() changing: Subject<boolean>;

  filterTags = [];
  currentAdIndex = -1;

  // @ViewChild(FilterTagDirective, {static: true}) adHost!: FilterTagDirective;
  @ViewChild('filterTagsContainer', { read: ViewContainerRef })
  filterTagsContainer!: ViewContainerRef;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {}

  addFilterTag(filterTag: FilterTag) {

    this.currentAdIndex += 1;
    filterTag.index = this.currentAdIndex;
    filterTag.description = filterTag.description + this.currentAdIndex;
    // const viewContainerRef = this.adHost.viewContainerRef;
    const viewContainerRef = this.filterTagsContainer;

    const adItem = new FilterItem(FilterTagComponent, filterTag);
    const componentRef = viewContainerRef.createComponent<FilterTagComponent>(
      adItem.component
    );

    console.log(adItem.filterTag);
    componentRef.instance.filterTag = adItem.filterTag;
    componentRef.instance.removeFilterTag.subscribe((filterTag: any) => {
      this.removeFilterTag(filterTag);
    });
    filterTag.componentReference = componentRef;
  }

  removeFilterTag(filterTag: FilterTag) {
    console.log(`i'm here deleted ${JSON.stringify(filterTag.description)}`);
    filterTag.componentReference.destroy();
  }
}
