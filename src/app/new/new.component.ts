import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from './../app.service';
import { IWindow } from './../interfaces/Window';

@Component({
  selector: 'search-bar',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
   
  @ViewChild('inputKeyword', { static: false })
  inputKeyword: ElementRef;

  defaultNoOfKeywordsShown = 3;
  showMoreOrLessLink = false;
  showMoreText = true;
  noOfKeywordsShown = 3;
  //inputKeyword: string;
  searching = false;
  benefitKeywordsFound: string[] = [];
  benefitKeywordsResult: Observable<any>;
  keywordObserver = new Subject();
  showResultBox = false;
  eventTarget: Subject<EventTarget> = new Subject<EventTarget>();
  content = {
    searchBarHint: 'Search by service or procedure...',
    searchBarAriaLabel: 'Enter 3 or more characters to start a search.',
    showMore: 'Show More',
    showLess: 'Show Less',
    noMatchingKeywords: 'No medical service found for searched text.',
    categories: [
      {
        name: 'Preventative Care',
        description: '',
        ariaLabel: '',
        image: 'preventative-care',
        analyticTag: '',
        sortNo: 1
      },
      {
        name: 'Emergency Care',
        description: '',
        ariaLabel: '',
        image: 'emergency-care',
        analyticTag: '',
        sortNo: 2
      },
      {
        name: 'Office Visits',
        description: '',
        ariaLabel: '',
        image: 'office-visits',
        analyticTag: '',
        sortNo: 3
      },
      {
        name: 'Hospital Visits',
        description: '',
        ariaLabel: '',
        image: 'hospital-visits',
        analyticTag: '',
        sortNo: 4
      },
      {
        name: 'Physical Therapies',
        description: '',
        ariaLabel: '',
        image: 'physical-therapies',
        analyticTag: '',
        sortNo: 5
      }
    ]
  };
  constructor(
    private api: ApiService,
    @Inject('Window') private window: IWindow,
    private currentComponent: ElementRef
  ) {}

  ngOnInit() {
    this.benefitKeywordsResult = this.keywordObserver.pipe(debounce(() => interval(500)));

    this.benefitKeywordsResult.subscribe((keyword) => {
       this.searchBenefitKeywords(keyword);
    });

    this.eventTarget.subscribe((target)=> {
      if(!this.currentComponent.nativeElement.contains(target)) {
        this.showResultBox = false;
      }
    })
    // hard code 
    /*
    this.benefitKeywordsFound = [
      'Ambulance',
      'Ambulance Room',
      'Ambulance Car',
      'Ambulance Transportation',
      'Ambulance Transportation',
      'Apple'
    ];
    this.showResultBox = true;
    */
  }

  onInputKeywordKeyUp(keyword: string) {
    this.searching = true;
    this.keywordObserver.next(keyword);
  }

  searchBenefitKeywords(keyword: string) {
    if (keyword.trim()){
      this.searchBenefitKeywords(keyword);
    } else {
      this.benefitKeywordsFound.length = 0;
    }
    this.api.getBenefitKeywords(keyword).subscribe((response) => {
      console.log('data response', response);
      this.buildKeywordList(response);
      this.showResultBox = true;
      this.searching = false;
      this.noOfKeywordsShown = this.defaultNoOfKeywordsShown;
    });
  }

  buildKeywordList(data: any) {
    this.benefitKeywordsFound = data.benefitKeywordsFound.map((d) => d);

    this.showMoreText = true;
    if (this.benefitKeywordsFound.length > this.defaultNoOfKeywordsShown) {
      this.noOfKeywordsShown = this.defaultNoOfKeywordsShown ;
      this.showMoreOrLessLink = true;
    }else {
      this.noOfKeywordsShown = this.benefitKeywordsFound.length; 
      this.showMoreOrLessLink = false;
    }

  }

  showMore () {
    if (this.noOfKeywordsShown === this.benefitKeywordsFound.length) {
      this.noOfKeywordsShown = this.defaultNoOfKeywordsShown;
    } else {
      this.noOfKeywordsShown = this.benefitKeywordsFound.length;
    }
    this.showMoreText = !this.showMoreText;
  }

  onInputKeywordFocus() {
    if (this.inputKeyword.nativeElement.value) {
      this.showResultBox = true;
    }
  }

  onInputKeywordBlur() {
    this.showResultBox = false;
  }

  onInputKeywordClear() {
    console.log('fdfd');
    this.showResultBox = false;
    this.benefitKeywordsFound.length = 0;
  }


  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    if (event.target) {
      this.eventTarget.next(event.target);
    }
  }

  @HostListener('document:focusout', ['$event'])
  focus(event: FocusEvent): void {
    if (event.target) {
      this.eventTarget.next(event.target);
    }
  }

  ngOnDestroy() {
    if (this.keywordObserver) {
      this.keywordObserver.unsubscribe();
    }
    if (this.eventTarget) {
      this.eventTarget.unsubscribe();
    }
  }
}
