import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  @ViewChild(TreeComponent)
  private treeFunction: TreeComponent;
  public _functionHierachy: any[];
  public _functions: any[];
  public filter: string = '';

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData(`api/function/getall?filter=${this.filter}`)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this.utilityService.unFlatten(response);
        console.log(this._functionHierachy);
      });
  }

}
