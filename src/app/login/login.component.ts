import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { AuthService } from '../core/services/auth.service';
import { SystemConstant } from '../core/constants/constant';
import { User } from '../models/user';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("nav-md");
    body.classList.add("login");
    this.localStorage.getItem(SystemConstant.REMEMBER_ACCOUNT).subscribe(data => {
      if (data) {
        this.loginForm.setValue(data);
      }
    })
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      Remember: [true]
    });
  }

  login() {
    this.spinnerService.show();
    this.authService.login(this.loginForm.value.UserName, this.loginForm.value.Password)
      .subscribe((result: any) => {
        let user = new User(result.fullName, result.username, result.email, result.access_token, result.avatar, result.permissions, result.roles);
        localStorage.setItem(SystemConstant.USER_CURRENT, JSON.stringify(user));
        if (this.loginForm.value.Remember) {
          this.localStorage.setItem(SystemConstant.REMEMBER_ACCOUNT, this.loginForm.value).subscribe((data) => { console.log(data) });
        } else {
          this.localStorage.removeItem(SystemConstant.REMEMBER_ACCOUNT).subscribe(() => { });
        }
        let redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : 'main/dashboard';
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.spinnerService.hide();
        this.router.navigate([redirectUrl], navigationExtras);
      });
  }
}
