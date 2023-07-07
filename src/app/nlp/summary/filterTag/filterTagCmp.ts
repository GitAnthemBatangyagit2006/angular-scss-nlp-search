import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface AdComponent {
  data: any;
}


@Component({
  styleUrls: ['filterTags.scss'],
  template: `
    <div class="filter-tag-wrapper" role="buttn" (click) ="removeTag()">
        <span>{{data.headline}}</span>
        <span class="motif-icon motif-delete"></span>
    </div>
  `
})
export class FilterTagComponent implements AdComponent {
  @Output() removeFilterTag = new EventEmitter();
  @Input() data: any;

  removeTag() {
    this.removeFilterTag.emit(this.data);
  }
}