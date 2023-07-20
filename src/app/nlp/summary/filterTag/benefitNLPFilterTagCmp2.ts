import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BenefitSummaryFilter, FilterTag } from '../benefitNLP';

@Component({
  styleUrls: ['benefitNLPFilterTags.scss'],
  selector: 'nlp-search-summary-filter-tag',
  template: `
    <div class="filter-tag-wrapper" role="button" (click)="removeTag()">
      <span [innerHTML]="selectedFilter.value"></span>
      <span class="motif-icon motif-delete"></span>
    </div>
    <div class="nlp-no-benefit-summary-message-wrapper">
    testfdfd
  </div>
  `
})
export class BenefitNLPFilterTagComponent2 {
  @Output() removeFilterTag = new EventEmitter();
  @Input() selectedFilter: BenefitSummaryFilter;

  removeTag() {
    this.selectedFilter.selected = false;
    this.removeFilterTag.emit(this.selectedFilter);
  }

  ngOnDestroy() {
    this.removeFilterTag?.unsubscribe();
  }
}
