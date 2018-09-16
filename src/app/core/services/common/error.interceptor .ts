import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor  implements HttpInterceptor {

  constructor(private authService: AuthService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any>{
    return next.handle(request).pipe(catchError(err=>{
      if(err.status = 401){
        this.authService.logout();
        location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
