import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
declare var $;

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  functions: any[];

  constructor(
    private dataService: DataService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.dataService.getData('api/function/getlisthierarchy').subscribe(data => {
      data = JSON.parse(data);
      this.functions = data.sort((n1, n2) => {
        if (n1.DisplayOrder > n2.DisplayOrder)
          return 1;
        else if (n1.DisplayOrder < n2.DisplayOrder)
          return -1;
        return 0;
      });
      setTimeout(() => {
        $("#sidebar-menu .child_menu li").on('click', function () {
          $('#sidebar-menu .child_menu li').removeClass('current-page').removeClass('active');
          $(this).addClass('current-page').addClass('active');
        });
      }, 0);
      this.loadScript();
    });
  }

  ngAfterViewInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login");
    body.classList.add("nav-md");
  }

  loadScript() {
    let s = document.createElement('script');
    s.src = "../../assets/js/custom.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
