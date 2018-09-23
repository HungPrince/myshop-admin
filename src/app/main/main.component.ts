import { Component, ElementRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConstants } from '../core/constants/url';
import { User } from '../models/user';
import { SystemConstant } from '../core/constants/constant';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  user: User;
  sessionId: any;
  token: any;
  BASE_FOLDER = SystemConstant.BASE_URL;
  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    if (localStorage.getItem(SystemConstant.USER_CURRENT)) {
      this.user = JSON.parse(localStorage.getItem(SystemConstant.USER_CURRENT));
    }
  }

  ngOnInit() {
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None')).subscribe(session => console.log(session));

    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None')).subscribe()
  }

  ngAfterViewInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login");
    body.classList.add("nav-md");
    let s = document.createElement('script');
    s.src = "../assets/js/custom.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate([UrlConstants.LOGIN]);
  }
}
