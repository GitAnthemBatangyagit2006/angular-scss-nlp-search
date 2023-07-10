import { Type } from '@angular/core';
import { BenefitSummaryFilter } from '../benefitNLP';
import { BenefitNLPFilterTagComponent } from '../filterTag/benefitNLPFilterTagCmp';

export class BenefitNLPFilterItem {
  constructor(public component: Type<BenefitNLPFilterTagComponent>, public benefitSummaryFilter: BenefitSummaryFilter) {}
}