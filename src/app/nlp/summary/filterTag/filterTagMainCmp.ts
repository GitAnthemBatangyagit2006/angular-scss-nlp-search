import { Component, Input, ViewChild } from "@angular/core";
import { FilterItem } from "../filterTag/filterItemCmp";
import { FilterTagComponent } from "../filterTag/filterTagCmp";
import { FilterTagDirective } from "../filterTag/filterTagDirective";



export interface FilterTagMainComponent {
  data: any;
}

@Component({
  selector: '[nlp-summary-filter]',
  template: `
  <div class="ad-banner-example">
    <h3>Advertisements</h3>
    <ng-template filter-tag></ng-template>
  </div>
`
})
export class FilterTagMainComponent {


  currentAdIndex = -1;

  @ViewChild(FilterTagDirective, {static: true}) adHost!: FilterTagDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
   // this.loadComponent();
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const adItem = new FilterItem(FilterTagComponent, {body:'Hello world', headline: 'headline...'});
    const componentRef = viewContainerRef.createComponent<FilterTagComponent>(adItem.component);
    componentRef.instance.data = adItem.data;

  }

}