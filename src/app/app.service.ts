import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://reqres.in';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url): Observable<any> {
    return this.http.get(API_URL + '/api/' + url).pipe(map(res => res));
  }

  public getBenefitKeywords(query: string): Observable<any> {
    return this.http.get(`http://localhost:4321/fed/nlpfindbenefits/v1/benefitKeywords?query=${query}`).pipe((d) => { console.log(d) ; return d });
  }
}
// /api/users