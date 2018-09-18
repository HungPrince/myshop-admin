import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConstant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let currentUser = JSON.parse(localStorage.getItem(SystemConstant.USER_CURRENT));
    if (currentUser && currentUser.Token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.Token}`
        }
      })
    }
    return next.handle(request);
  }
}
