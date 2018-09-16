import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 1;
  totalRows: number;
  filter: string = "";
  roles: any;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadDataRole();
  }

  private loadDataRole() {
    this.dataService.getData(`api/role/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`).subscribe(data => {
      this.roles = data.Items;
      this.totalRows = data.TotalRows;
      this.pageIndex = data.PageIndex;
      this.pageSize = data.PageSize;
      console.log(data);
    })
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadDataRole();
  }

}
