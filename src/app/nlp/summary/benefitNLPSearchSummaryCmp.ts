import { Component, ElementRef, HostListener, Inject, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from '../../app.service';
import { IWindow } from '../../interfaces/Window';

@Component({
  selector: 'search-summary',
  templateUrl: './benefitNLPSearchSummary.html',
  styleUrls: ['./benefitNLPSearchSummary.scss'],
})
export class BenefitNLPSearchSummaryComponent implements OnInit {
  
  constructor(
    private api: ApiService,
    @Inject('Window') private window: IWindow,
    private currentComponent: ElementRef
  ) {}

  ngOnInit() {
   
  }

}
