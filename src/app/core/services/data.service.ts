import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConstant } from '../constants/constant';

let headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' })

@Injectable({
  providedIn:'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public postData(url: string, data?: any): Observable<any> {
    let uri = SystemConstant.BASE_URL + url;
    return this.httpClient.post(uri, data, { headers: headers });
  }

  public getData(url: string): Observable<any> {
    let uri = SystemConstant.BASE_URL + url;
    return this.httpClient.get(uri, { headers: headers });
  }

  public deleteData(url: string): Observable<any> {
    let uri = SystemConstant.BASE_URL + url;
    return this.httpClient.delete(uri, { headers: headers });
  }
}
