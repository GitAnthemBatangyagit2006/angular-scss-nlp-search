import { Type } from '@angular/core';
import { BenefitSummaryFilter, FilterTag } from '../benefitNLP';
import { FilterTagComponent } from '../filterTag/filterTagCmp';

export class FilterItem {
  constructor(public component: Type<FilterTagComponent>, public filterTag: FilterTag) {}
}