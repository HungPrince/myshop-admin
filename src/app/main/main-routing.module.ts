import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';

const mainRoutes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'user', loadChildren: './user/user.module#UserModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    DashboardModule,
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [

  ]
})
export class MainRoutingModule { }
