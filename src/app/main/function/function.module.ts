import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { TreeModule } from 'angular-tree-component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const functionRoutes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: FunctionComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    RouterModule.forChild(functionRoutes)
  ],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
