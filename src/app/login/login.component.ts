import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { AuthService } from '../core/services/auth.service';
import { SystemConstant } from '../core/constants/constant';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserLogin;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage

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
    this.authService.login(this.loginForm.value.UserName, this.loginForm.value.Password)
      .subscribe((result: any) => {
        let user = new User(result.fullName, result.username, result.email, result.token, result.avatar);
        localStorage.setItem(SystemConstant.USER_CURRENT, JSON.stringify(user));
        console.log(this.loginForm);
        if (this.loginForm.value.Remember) {
          this.localStorage.setItem(SystemConstant.REMEMBER_ACCOUNT, this.loginForm.value).subscribe((data) => { console.log(data) });
        }else{
          this.localStorage.removeItem(SystemConstant.REMEMBER_ACCOUNT).subscribe(()=>{});
        }
        this.router.navigate(['main/dashboard']);
      });
  }
}

class UserLogin {
  UserName: string;
  Password: string;
}
