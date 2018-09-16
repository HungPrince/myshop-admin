import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConstant } from '../constants/constant';

let headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
headers.append('accept', 'application/json');

@Injectable({
  providedIn:'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public postData(uri: string, data?: any): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.post(url, data, { headers: headers });
  }

  public getData(uri: string): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.get(url, { headers: headers });
  }

  public deleteData(uri: string): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.delete(url, { headers: headers });
  }
}
