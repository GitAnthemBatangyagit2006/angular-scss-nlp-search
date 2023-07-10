
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filter-tag]'
})
export class BenefitNLPFilterTagsDirective
 {
  constructor(public viewContainerRef: ViewContainerRef) {}
}