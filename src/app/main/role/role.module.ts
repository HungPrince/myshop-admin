import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

const roleRoutes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: RoleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes),
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
