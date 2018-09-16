import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RoleModule } from './role/role.module';
import { AuthGuard } from '../core/services/common/auth.guard';

const mainRoutes: Routes = [
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'user', loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'role', loadChildren: './role/role.module#RoleModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    DashboardModule,
    RoleModule,
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [

  ]
})
export class MainRoutingModule { }
