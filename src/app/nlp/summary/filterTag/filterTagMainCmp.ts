import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { FilterItem } from "../filterTag/filterItemCmp";
import { AdComponent, FilterTagComponent } from "../filterTag/filterTagCmp";
import { FilterTagDirective } from "../filterTag/filterTagDirective";



@Component({
  selector: '[nlp-summary-filter],nlp-summary-filter',
  template: `
  <div class="ad-banner-example">
    <h3>Advertisementsxx</h3>
    <ng-template #filterTag [filter-tag]></ng-template>
  </div>
`
})
export class FilterTagMainComponent  implements OnInit {
  @Output()
  addTag = new EventEmitter();

  @Input() changing: Subject<boolean>;

  currentAdIndex = -1;

  @ViewChild(FilterTagDirective, {static: true}) adHost!: FilterTagDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
    console.log('fdfd')
    this.addComponent({body:'Hello worldzzs', headline: 'headline...'});

    this.changing?.subscribe(v => { 
      console.log('value is changing', v);
    });
  }


  addComponent(data: any) {
    const viewContainerRef = this.adHost.viewContainerRef;
    //viewContainerRef.clear();

    const adItem = new FilterItem(FilterTagComponent, data);
    const componentRef = viewContainerRef.createComponent<FilterTagComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

}