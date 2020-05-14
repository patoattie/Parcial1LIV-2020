import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  public peticionGet(url: string, params: any): Observable<any> {
// console.log(url);
    // const paramsHttp = {params};
    const paramsHttp = new HttpParams();

    paramsHttp.append('api_key', '73f9841'.concat('cbba42072').concat('a2e12038').concat('92c07179'));
    paramsHttp.append('sort_by', 'popularity.desc');
    paramsHttp.append('language', 'es-MX');

    return this.http.get(url, {params: {api_key: '73f9841'.concat('cbba42072').concat('a2e12038').concat('92c07179'), sort_by: 'popularity.desc', language: 'es-MX'}});
  }
}
