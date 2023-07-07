import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FilterItem } from "../filterTag/filterItemCmp";
import { AdComponent, FilterTagComponent } from "../filterTag/filterTagCmp";
import { FilterTagDirective } from "../filterTag/filterTagDirective";



@Component({
  selector: '[nlp-summary-filter],nlp-summary-filter',
  template: `
  <div class="ad-banner-example">
    <h3>Advertisementsxx</h3>
    <ng-template [filter-tag]></ng-template>
  </div>
`
})
export class FilterTagMainComponent  implements OnInit {


  currentAdIndex = -1;

  @ViewChild(FilterTagDirective, {static: true}) adHost!: FilterTagDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
    console.log('fdfd')
    //this.loadComponent();
  }


  loadComponent() {

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const adItem = new FilterItem(FilterTagComponent, {body:'Hello worldz', headline: 'headline...'});
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
    

  }

}