import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { SystemConstant } from '../constants/constant';
import { Observable } from 'rxjs';

let headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' })

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public redirectUrl: string;
  constructor(
    private httpClient: HttpClient,
  ) { }

  login(userName: string, passWorld: string): Observable<any> {
    let data = "username=" + userName + "&&password=" + passWorld + "&&grant_type=password";
    let url = SystemConstant.BASE_URL + 'api/oauth/token';
    return this.httpClient.post(url, data, { headers: headers });
  }

  logout() {
    localStorage.removeItem(SystemConstant.USER_CURRENT);
  }

  checkLoggedInUser(): boolean {
    return localStorage.getItem(SystemConstant.USER_CURRENT) ? true : false;
  }

  checkAccess(functionName: string): boolean {
    if (this.checkLoggedInUser()) {
      let user: any = JSON.parse(localStorage.getItem(SystemConstant.USER_CURRENT));
      let permissions = JSON.parse(user.Permissions);
      let roles = JSON.parse(user.Roles);
      return roles.findIndex(x => x == "Admin") != -1 || (permissions.findIndex(x => x.FunctionId == functionName && x.CanRead));
    }
  }

  hasPermission(functionName: string, actionName: string) {
    let user: any = JSON.parse(localStorage.getItem(SystemConstant.USER_CURRENT));
    let permissions = JSON.parse(user.Permissions);
    let roles = JSON.parse(user.Roles);
    if (roles.findIndex(x => x == "Admin") != -1) {
      return true;
    }
    switch (actionName) {
      case 'create':
        return permissions.findIndex(x => x.FunctionId == functionName && x.CanCreate) != -1;
      case 'update':
        return permissions.findIndex(x => x.FunctionId == functionName && x.CanUpdate) != -1;
      case 'delete':
        return permissions.findIndex(x => x.FunctionId == functionName && x.CanDelete) != -1;
    }
    return  false;
  }

}
