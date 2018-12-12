import { MessageContstants } from './../../core/constants/messages';
import { NotificationService } from './../../core/services/notification.service';
import { FormHelper } from './../../core/helpers/form.helper';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 20;
  totalRows: number;
  filter: string = "";
  private treeCategory: TreeComponent;
  public _functionHierachy: any[];
  public _categoriess: any[];
  modalRef: BsModalRef;
  formEntity: FormGroup;
  entityCurrent: any;
  public permissions: any[];
  categoryId: string;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private modalService: BsModalService,
    private FormBuilder: FormBuilder,
    private formHelper: FormHelper,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.dataService.getData(`api/categories/getall?keyWord=${this.filter}&page=${this.pageIndex}&pageSize=${this.pageSize}`)
      .subscribe(result => {
        console.log(result);
      });
  }
}
