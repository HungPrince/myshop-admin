import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule, ModalModule  } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const functionRoutes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: ProductComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    RouterModule.forChild(functionRoutes), 
    ModalModule.forRoot(),
    EditorModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
