import { Component, ElementRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConstants } from '../core/constants/url';
import { User } from '../models/user';
import { SystemConstant } from '../core/constants/constant';
import { map } from 'rxjs/operators';
import { DataService } from '../core/services/data.service';

declare var $;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  BASE_FOLDER = SystemConstant.BASE_URL;
  user: User;
  sessionId: any;
  token: any;
  functions: any[];
  loadScript: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private dataService: DataService,
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
      .pipe(map(fragment => fragment || 'None')).subscribe();
  }

  ngAfterViewInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login");
    body.classList.add("nav-md");
  }

  logOut() {
    this.authService.logout();
    this.router.navigate([UrlConstants.LOGIN]);
  }
}
