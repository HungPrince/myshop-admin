import { MessageContstants } from './../../core/constants/messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { UtilityService } from './../../core/services/utility.service';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from './../../core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild(TreeComponent)
  private treeProductCategory: TreeComponent;
  public filter: string = '';
  public entity: any;
  public functionId: string;
  public _productCategoryHierachy: any[];
  public _productCategories: any[];
  constructor(
    private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.search();
    this.getListForDropdown();
  }
  public createAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }
  //Load data
  public search() {
    this._dataService.getData('/api/category/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._productCategoryHierachy = this.utilityService.Unflatten2(response);
        this._productCategories = response;
      });
  }
  public getListForDropdown() {
    this._dataService.getData('/api/category/getallhierachy')
      .subscribe((response: any[]) => {
        this._productCategories = response;
      });
  }
  //Show add form
  public showAdd() {
    this.entity = {};
    this.addEditModal.show();
  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.getData('/api/category/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.addEditModal.show();
    });
  }

  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.deleteData(`/api/category/delete/${id}`).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.search();
    });
  }
  //Click button delete turn on confirm
  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }
  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.entity.ID == undefined) {
        this._dataService.postData('/api/category/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        });
      }
      else {
        this._dataService.putData('/api/category/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        });

      }
    }

  }

  public onSelectedChange($event) {
    console.log($event);
  }
}
