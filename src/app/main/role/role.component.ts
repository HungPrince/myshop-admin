import { map } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../core/helpers/form.helper';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/constants/messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 20;
  totalRows: number;
  filter: string = "";
  roles: any;
  roleCurrent: any;
  modalRef: BsModalRef;
  formRole: FormGroup;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private formHelper: FormHelper,
    private notificationService: NotificationService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.loadDataRole();
    this.formRole = this.formBuilder.group({
      Id: [''],
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Description: ['', Validators.required]
    });
  }

  loadDataRole() {
    this.spinnerService.show();
    this.dataService.getData(`api/role/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`).subscribe(data => {
      this.roles = data.Items;
      this.totalRows = data.TotalRows;
      this.pageIndex = data.PageIndex;
      this.pageSize = data.PageSize;
      this.spinnerService.hide();
    })
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadDataRole();
  }

  isError(nameInput: string) {
    return this.formHelper.isError(this.formRole, nameInput);
  }

  isErrorRequired(nameInput: string) {
    return this.formHelper.isErrorRequired(this.formRole, nameInput);
  }

  isErrorMinLength(nameInput: string) {
    return this.formHelper.isErrorMinLength(this.formRole, nameInput);
  }

  saveChange() {
    if (this.formRole.valid) {
      let data = JSON.stringify(this.formRole.value);
      let id = this.formRole.value.Id;
      let uri = id ? "api/role/update" : "api/role/add";
      let index = this.roles.findIndex(x => x.Id == id);
      this.spinnerService.show();
      if (id) {
        this.dataService.putData(uri, data).subscribe(res => {
          this.roles[index] = { Id: res.Id, Name: res.Name, Description: res.Description };
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          this.spinnerService.hide();
        });
      } else {
        this.dataService.postData(uri, data).subscribe(res => {
          this.roles.push({ Id: res.Id, Name: res.Name, Description: res.Description });
          this.totalRows++;
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          this.spinnerService.hide();
        });
      }
    }
  }

  delete() {
    if (this.roleCurrent.Id) {
      let id = this.roleCurrent.Id;
      let uri = `api/role/delete?id=${id}`;
      this.dataService.deleteData(uri).subscribe(id => {
        if (id) {
          this.roles = this.roles.filter(x => x.Id != id);
          this.totalRows--;
        }
        this.modalRef.hide();
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      });
    }
  }

  openModal(template: TemplateRef<any>, role: any) {
    if (role) {
      this.formRole.setValue(role);
    }
    this.modalRef = this.modalService.show(template);
  }

  openModalConfirm(template: TemplateRef<any>, role: any) {
    this.modalRef = this.modalService.show(template);
    this.roleCurrent = role;
  }
}

