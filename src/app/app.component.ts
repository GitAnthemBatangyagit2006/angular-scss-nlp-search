import { Component, Inject } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ApiService } from './app.service';
import { IWindow } from './interfaces/Window';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  benefitKeywordsFound: any;
  results$: Observable<any>;
  subject = new Subject();

  content = {
    benefitNLPSearchComponent: {
      categories: [
        {
          name: 'Preventative Care',
          description: '',
          ariaLabel: '',
          image: '',
          analyticTag: '',
          sortNo: 1,
        },
        {
          name: 'Emergency Care',
          description: '',
          ariaLabel: '',
          image: '',
          analyticTag: '',
          sortNo: 2,
        },
        {
          name: 'Office Visits',
          description: '',
          ariaLabel: '',
          image: '',
          analyticTag: '',
          sortNo: 3,
        },
        {
          name: 'Hospital Visits',
          description: '',
          ariaLabel: '',
          image: '',
          analyticTag: '',
          sortNo: 4,
        },
        {
          name: 'Physical Therapies',
          description: '',
          ariaLabel: '',
          image: '',
          analyticTag: '',
          sortNo: 5,
        }

      ]
    },
  };
  constructor(
    private api: ApiService,
    @Inject('Window') private window: IWindow
  ) {}

  ngOnInit() {
    this.results$ = this.subject.pipe(debounce(() => interval(1000)));

    this.results$.subscribe((searchText) => {
      this.apiCall(searchText);
    });
  }

  search(evt) {
    const searchText = evt.target.value;
    // emits the `searchText` into the stream. This will cause the operators in its pipe function (defined in the ngOnInit method) to be run. `debounce` runs and then `map`. If the time interval of 1 sec in debounce hasn't elapsed, map will not be called, thereby saving the server from being called.
    if (searchText?.trim()) {
      this.subject.next(searchText);
    }
  }

  apiCall(searchText: string) {
    this.api.getBenefitKeywords(searchText).subscribe((response) => {
      console.log('data response', response);
      this.buildKeywordList(response);
    });
  }

  buildKeywordList(data: any) {
    this.benefitKeywordsFound = data.benefitKeywordsFound.map((d) => d);
  }
}
