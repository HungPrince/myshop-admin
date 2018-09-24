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
  modalRef: BsModalRef;
  formEntity: FormGroup;
  entityCurrent: any;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private modalService: BsModalService,
    private FormBuilder: FormBuilder,
    private formHelper: FormHelper) {
  }

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  initForm() {
    this.formEntity = this.FormBuilder.group({
      ID: ['', Validators.required],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      URL: ['', Validators.required],
      DisplayOrder: [''],
      ParentId: [''],
      IconCss: [''],
      Status: [true]
    });
  }

  isError(nameInput: string) {
    return this.formHelper.isError(this.formEntity, nameInput);
  }

  isErrorRequired(nameInput: string) {
    return this.formHelper.isErrorRequired(this.formEntity, nameInput);
  }

  isErrorMinLength(nameInput: string) {
    return this.formHelper.isErrorMinLength(this.formEntity, nameInput);
  }

  loadData() {
    this.dataService.getData(`api/function/getall?filter=${this.filter}`)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this.utilityService.unFlatten(response);
      });
  }

  saveChange() {
    if (this.formEntity.valid) {
      let url = check ? "api/function/update" : "api/function/add";
      var check = this.formEntity.get('ID').disabled;
      this.formEntity.value.ID = this.formEntity.get('ID').value;
      var data = JSON.stringify(this.formEntity.value);
      if (check) {
        this.dataService.putData(url, data).subscribe(res => {
          this.loadData();
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        });
      } else {
        this.dataService.postData(url, data).subscribe(res => {
          this.loadData();
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        });
      }
    }
  }

  delete() {
    if (this.entityCurrent.ID) {
      let id = this.entityCurrent.ID;
      let uri = `api/function/delete?id=${id}`;
      this.dataService.deleteData(uri).subscribe(id => {
        if (id) {
          this.loadData();
        }
        this.modalRef.hide();
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      });
    }
  }

  openModalAddEdit(template: TemplateRef<any>, entity: any) {
    if (entity) {
      this.formEntity.setValue({
        ID: entity.ID,
        Name: entity.Name,
        URL: entity.URL,
        DisplayOrder: entity.DisplayOrder,
        ParentId: entity.ParentId,
        IconCss: entity.IconCss,
        Status: entity.Status
      });
      this.formEntity.get('ID').disable();
    } else {
      this.formEntity.get('ID').enable();
      this.formEntity.reset();
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  openModalConfirm(template: TemplateRef<any>, entity: any) {
    this.modalRef = this.modalService.show(template);
    this.entityCurrent = entity;
  }
}
