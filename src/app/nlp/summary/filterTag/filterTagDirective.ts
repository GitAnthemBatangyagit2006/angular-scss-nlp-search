
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filter-tag]'
})
export class FilterTagDirective {
  constructor(public viewContainerRef: ViewContainerRef) { console.log('d')}
}