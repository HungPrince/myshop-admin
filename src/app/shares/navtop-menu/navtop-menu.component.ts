import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SystemConstant } from '../../core/constants/constant';

@Component({
  selector: 'app-navtop-menu',
  templateUrl: './navtop-menu.component.html',
  styleUrls: ['./navtop-menu.component.css']
})
export class NavtopMenuComponent implements OnInit {

  BASE_FOLDER = SystemConstant.BASE_URL;

  @Input('User') user : any;
  @Output('logOut') logOut : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  logOutE(){
    this.logOut.emit();
  }

}
