import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { FilterItem } from "../filterTag/filterItemCmp";
import { AdComponent, FilterTagComponent } from "../filterTag/filterTagCmp";
import { FilterTagDirective } from "../filterTag/filterTagDirective";




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
`
})
export class FilterTagMainComponent  implements OnInit {
  @Output()
  addTag = new EventEmitter();

  @Input() changing: Subject<boolean>;

  filterTags = [];
  currentAdIndex = -1;

  @ViewChild(FilterTagDirective, {static: true}) adHost!: FilterTagDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
  }

  addFilterTag(data: any) {
    this.currentAdIndex += 1;
    data.index = this.currentAdIndex;
    data.body = data.body + this.currentAdIndex;
    const viewContainerRef = this.adHost.viewContainerRef;
    //viewContainerRef.clear();

    const adItem = new FilterItem(FilterTagComponent, data);
    const componentRef = viewContainerRef.createComponent<FilterTagComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
    componentRef.instance.removeFilterTag.subscribe((d: any) => {
      this.removeFilterTag(data);
    })
    data.componentRef = componentRef;
  }

  removeFilterTag(data: any) {
    console.log(`i'm here deleted ${JSON.stringify(data.body)}`);
    data.componentRef.destroy();
  }

}