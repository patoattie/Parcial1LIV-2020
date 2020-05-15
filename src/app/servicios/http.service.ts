import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  public peticionGet(url: string, params: any): Observable<any> {
    const paramsHttp = {params};

    return this.http.get(url, paramsHttp);
  }
}
