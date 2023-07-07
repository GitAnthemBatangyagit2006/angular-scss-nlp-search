import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface AdComponent {
  data: any;
}

@Component({
  styleUrls: ['./filterTag.scss'],
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
      <button (click)="removeTag()">delete</button>
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