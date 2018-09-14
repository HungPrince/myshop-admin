import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { SystemConstant } from '../constants/constant';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

let headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' })

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  login(userName: string, passWorld: string): Observable<any> {
    let data = "username=" + userName + "&&password=" + passWorld + "&&grant_type=password";
    let url = SystemConstant.BASE_URL + 'api/oauth/token';
    return this.httpClient.post(url, data, { headers: headers });
  }

  logout() {
    localStorage.removeItem(SystemConstant.USER_CURRENT);
  }

}
