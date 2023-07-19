import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { BenefitSummaryFilter, FilterTag } from "../benefitNLP";


@Component({
  styleUrls: ['benefitNLPFilterTags.scss'],
  selector: 'nlp-search-summary-filter-tag',
  template: `
    <div class="filter-tag-wrapper" role="buttn" (click) ="removeTag()">
        <span>{{benefitSummaryFilter.value}}</span>
        <span class="motif-icon motif-delete"></span>
    </div>
  `
})
export class BenefitNLPFilterTagComponent2 {
  @Output() removeFilterTag = new EventEmitter();
  @Input() benefitSummaryFilter: BenefitSummaryFilter;

  removeTag() {
    this.removeFilterTag.emit(this.benefitSummaryFilter);
  }
  
  ngOnDestroy() {
    if (this.removeFilterTag) {
      this.removeFilterTag.unsubscribe();
    }
  }
}