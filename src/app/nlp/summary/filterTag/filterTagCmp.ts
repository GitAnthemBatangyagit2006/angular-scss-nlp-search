import { Component, Input } from "@angular/core";

export interface AdComponent {
  data: any;
}

@Component({
  styleUrls: ['./filterTag.scss'],
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
    </div>
  `
})
export class FilterTagComponent implements AdComponent {
  @Input() data: any;
}