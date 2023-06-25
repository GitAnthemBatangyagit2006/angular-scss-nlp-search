import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { IsOptional } from 'class-validator';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from './app.service';
import { IWindow } from './interfaces/Window';
import { nlpDetails, mockBenefitDetails } from './nlp/details/benefitNLPSearchDetailsModel';


export class Test {
  @IsOptional()  
  prop: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit { 
  data: any;
  
  ngOnInit () {

    const nlp = new nlpDetails();
    this.data = JSON.stringify(nlp.transformResponseToNlpBenefitsSummaryDetails(mockBenefitDetails));
  }
}
