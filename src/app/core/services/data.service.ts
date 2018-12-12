import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConstant } from '../constants/constant';

let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public postData(uri: string, data?: any): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.post(url, data, { headers: headers });
  }

  public putData(uri: string, data?: any): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.put(url, data, { headers: headers });
  }

  public getData(uri: string): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.get(url, { headers: headers });
  }

  public deleteData(uri: string): Observable<any> {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.delete(url, { headers: headers });
  }

  public deleteMulti(uri: string, key: string, value: string): Observable<any> {
    let url = SystemConstant.BASE_URL + uri + "/?" + key + "=" + value;
    return this.httpClient.delete(url, { headers: headers });
  }

  deleteWithMultiParams(uri: string, params) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    let url = SystemConstant.BASE_URL + uri + "/?" + paramStr
    return this.httpClient.delete(url, { headers: headers });
  }

  public postFile(uri: string, data?: any) {
    let url = SystemConstant.BASE_URL + uri;
    return this.httpClient.post(url, data);
  }
}
