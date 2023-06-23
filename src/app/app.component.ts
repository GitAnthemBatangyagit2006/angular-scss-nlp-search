import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from './app.service';
import { IWindow } from './interfaces/Window';
import { nlpDetails, mockBenefitDetails } from './nlp/details/benefitNLPSearchDetailsModel';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit { 
  data: any;
  
  ngOnInit () {
    this.data = new nlpDetails();
    this.data.transform(mockBenefitDetails);
  }
}
