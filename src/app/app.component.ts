import { Component, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ApiService } from './app.service';
import { IWindow } from './interfaces/Window';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: any;
  results$: Observable<any>;
  subject = new Subject();
  constructor(private api: ApiService, @inject('Window') private window: IWindow) {}

  ngOnInit() {
    this.results$ = this.subject.pipe(
      debounce(() => Rx.Observable.interval(1000)),
      map((searchText) => this.httpClient.get('/api/search?q=' + searchText))
    );
  }
  search(evt) {
    const searchText = evt.target.value;
    // emits the `searchText` into the stream. This will cause the operators in its pipe function (defined in the ngOnInit method) to be run. `debounce` runs and then `map`. If the time interval of 1 sec in debounce hasn't elapsed, map will not be called, thereby saving the server from being called.
    this.subject.next(searchText);
  }

  apiCall () {
    this.api.get('users?page=1').subscribe(res => {
      this.users = res;
    });
  }
}
