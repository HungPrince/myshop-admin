import { NotificationService } from './../notification.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import { catchError } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 401) {
        this.authService.logout();
        location.reload(true);
      }
      const error = err.error.message || err.statusText;
      this.notificationService.printErrorMessage(err);
      this.spinnerService.hide();
      return throwError(error);
    }))
  }
}
