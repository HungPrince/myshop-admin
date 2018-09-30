import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { CustomdropdownDirective } from './../directives/customdropdown.directive';
import { SidebardropdownDirective } from './../directives/sidebardopdown.directive'
import { NavtopMenuComponent } from './../shares/navtop-menu/navtop-menu.component';
import { SidebarMenuComponent } from './../shares/sidebar-menu/sidebar-menu.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    NavtopMenuComponent,
    SidebarMenuComponent,
    CustomdropdownDirective,
    SidebardropdownDirective
   ]
})
export class MainModule { }
