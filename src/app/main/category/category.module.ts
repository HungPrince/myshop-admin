import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { Routes, RouterModule } from '@angular/router';
import {  ModalModule  } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';

const functionRoutes: Routes = [
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
    FormsModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    RouterModule.forChild(functionRoutes), 
    ModalModule.forRoot()
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
