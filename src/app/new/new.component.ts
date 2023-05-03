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

  defaultDisplayLimit = 3;
  showMoreOrLessLink = false;
  showMoreText = true;
  displayLimit = 3;
  //inputKeyword: string;
  searching = false;
  benefitKeywordsFound: any;
  results$: Observable<any>;
  subject = new Subject();
  showResultBox = false;
  eventTarget: Subject<EventTarget> = new Subject<EventTarget>();
  content = {
    searchBarHint: 'Search by service or procedure...',
    searchBarAriaLabel: 'Enter 3 or more characters to start a search.',
    showMore: 'Show More',
    showLess: 'Show Less',
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
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.results$ = this.subject.pipe(debounce(() => interval(1000)));

    this.results$.subscribe((searchText) => {
      this.apiCall(searchText);
    });

    this.eventTarget.subscribe((target)=> {
      if(!this.eRef.nativeElement.contains(target)) {
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
*/

  }

  search(evt) {
    const searchText = evt.target.value;
    // emits the `searchText` into the stream. This will cause the operators in its pipe function (defined in the ngOnInit method) to be run. `debounce` runs and then `map`. If the time interval of 1 sec in debounce hasn't elapsed, map will not be called, thereby saving the server from being called.
    if (searchText?.trim()) {
      this.searching = true;
      this.subject.next(searchText);
    }else {
      this.benefitKeywordsFound.length = 0;
      this.showResultBox = false;
      return;
    }
  }

  apiCall(searchText: string) {
  
    this.api.getBenefitKeywords(searchText).subscribe((response) => {
      console.log('data response', response);
      this.buildKeywordList(response);
      this.showResultBox = true;
      this.searching = false;
    });
  }

  buildKeywordList(data: any) {
    this.benefitKeywordsFound = data.benefitKeywordsFound.map((d) => d);

    this.showMoreText = true;
    if (this.benefitKeywordsFound.length > this.defaultDisplayLimit) {
      this.displayLimit = this.defaultDisplayLimit ;
      this.showMoreOrLessLink = true;
    }else {
      this.displayLimit = this.benefitKeywordsFound.length; 
      this.showMoreOrLessLink = false;
    }

  }

  showMore () {
    if (this.displayLimit  === this.benefitKeywordsFound.length) {
      this.displayLimit = this.defaultDisplayLimit;
    } else {
      this.displayLimit = this.benefitKeywordsFound.length;
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
}
