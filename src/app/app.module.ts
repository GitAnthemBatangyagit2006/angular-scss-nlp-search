import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NewComponent } from './new/new.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './app.service';
import { BenefitNLPSearchSummaryComponent } from './nlp/summary/benefitNLPSearchSummaryCmp';
import { BenefitNLPSearchDetailsComponent } from './nlp/details/benefitNLPSearchDetails';

import { BenefitNLPFilterTagsMainComponent } from './nlp/summary/filterTag/benefitNLPFilterTagsMainCmp';
import { BenefitNLPFilterTagComponent } from './nlp/summary/filterTag/benefitNLPFilterTagCmp';
import { BenefitNLPFilterTagsDirective } from './nlp/summary/filterTag/benefitNLPFilterTagsDirective';

export function getWindow() {
  return window;
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, NewComponent, BenefitNLPSearchSummaryComponent,BenefitNLPSearchDetailsComponent, BenefitNLPFilterTagsMainComponent, BenefitNLPFilterTagComponent, BenefitNLPFilterTagsDirective],
  providers: [
    HttpClient,
    ApiService,
    {
      provide: 'Window',
      useFactory: getWindow,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
