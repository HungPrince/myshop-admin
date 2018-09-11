import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { SystemConstant } from '../constants/constant';
import { User } from '../../models/user';

let headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' })

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }

  login(userName: string, passWorld: string) {
    let usr = "username=" + userName + "&&password" + passWorld;
    this.dataService.postData("login", usr).subscribe(res => {
      let data = "username=" + userName + "&&password" + passWorld + "&&grant_type=password";
      this.httpClient.post('api/oauth/token', data, { headers: headers }).subscribe((result: any) => {
        let user = new User(result.username, result.email, result.token, result.avatar);
        localStorage.setItem(SystemConstant.USER_CURRENT, JSON.stringify(user));
      });
    });
  }

  logout() {
    localStorage.removeItem(SystemConstant.USER_CURRENT);
  }

}
