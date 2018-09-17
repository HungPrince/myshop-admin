import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../core/helpers/form.helper';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/constants/messages';

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
  modalRef: BsModalRef;
  formRole: FormGroup;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private formHelper: FormHelper,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadDataRole();
    this.formRole = this.formBuilder.group({
      Id: [''],
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Description: ['', Validators.required]
    });
  }

  private loadDataRole() {
    this.dataService.getData(`api/role/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`).subscribe(data => {
      this.roles = data.Items;
      this.totalRows = data.TotalRows;
      this.pageIndex = data.PageIndex;
      this.pageSize = data.PageSize;
    })
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadDataRole();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      let id = this.formRole.value.id;
      let uri = id ? "api/role/update" : "api/role/add";
      if (id) {
        this.dataService.putData(uri, data).subscribe(res => {
          this.roles.push(this.formRole.value);
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, err => console.log(err));
      } else {
        this.dataService.postData(uri, data).subscribe(res => {
          this.roles.push(this.formRole.value);
          this.totalRows++;
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, err => console.log(err))
      }
    }
  }
}
