import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'main', loadChildren: './main/main.module#MainModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    MainModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    LoginModule,
    MainModule,
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
