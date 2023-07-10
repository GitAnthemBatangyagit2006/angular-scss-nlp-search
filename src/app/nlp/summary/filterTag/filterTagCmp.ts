import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BenefitSummaryFilter, FilterTag } from "../benefitNLP";


@Component({
  styleUrls: ['filterTags.scss'],
  template: `
    <div class="filter-tag-wrapper" role="buttn" (click) ="removeTag()">
        <span>{{filterTag.description}}</span>
        <span class="motif-icon motif-delete"></span>
    </div>
  `
})
export class FilterTagComponent {
  @Output() removeFilterTag = new EventEmitter();
  @Input() filterTag: FilterTag;

  removeTag() {
    this.removeFilterTag.emit(this.filterTag);
  }
}