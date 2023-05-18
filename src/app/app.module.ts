import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NewComponent } from './new/new.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './app.service';
import { BenefitNLPSearchSummaryComponent } from './nlp/summary/benefitNLPSearchSummaryCmp';

export function getWindow() {
  return window;
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, NewComponent, BenefitNLPSearchSummaryComponent],
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
