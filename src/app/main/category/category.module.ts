import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { TreeModule } from 'angular-tree-component';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const categoryRoutes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: CategoryComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    RouterModule.forChild(categoryRoutes)
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
