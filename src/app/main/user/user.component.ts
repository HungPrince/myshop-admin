import { map } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../core/helpers/form.helper';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/constants/messages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pageIndex: number = 1;
  pageSize: number = 20;
  totalRows: number;
  filter: string = "";
  entities: any;
  entityCurrent: any;
  modalRef: BsModalRef;
  formEntity: FormGroup;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private formHelper: FormHelper,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadData();
    this.formEntity = this.formBuilder.group({
      Id: [''],
      FullName: ['', [Validators.required, Validators.minLength(4)]],
      UserName: ['', [Validators.required, Validators.minLength(6)]],
      Password: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['',],
      Gender: ['',],
      BirthDay: ['',],
      Address: ['',],
      Avatar: ['',],
      Status: ['',],
      Roles: ['Admin']
    });
  }

  loadData() {
    this.dataService.getData(`api/user/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`).subscribe(data => {
      this.entities = data.Items;
      this.totalRows = data.TotalRows;
      this.pageIndex = data.PageIndex;
      this.pageSize = data.PageSize;
      console.log(this.entities);
    })
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadData();
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

  saveChange() {
    if (this.formEntity.valid) {
      this.formEntity.value.roles = [{ Admin: "Admin" }];

      let data: any = JSON.stringify(this.formEntity.value);
      let id = this.formEntity.value.Id;
      let uri = id ? "api/user/update" : "api/user/add";
      let index = this.entities.findIndex(x => x.Id == id);
      if (id) {
        this.dataService.putData(uri, data).subscribe(res => {
          this.entities[index] = { Id: res.Id, Name: res.Name, Description: res.Description };
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, err => console.log(err));
      } else {
        this.dataService.postData(uri, data).subscribe(res => {
          this.entities.push(res);
          this.totalRows++;
          this.modalRef.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, err => console.log(err))
      }
    }
  }

  delete() {
    if (this.entityCurrent.Id) {
      let id = this.entityCurrent.Id;
      let uri = `api/user/delete?id=${id}`;
      this.dataService.deleteData(uri).subscribe(id => {
        if (id) {
          this.entities = this.entities.filter(x => x.Id != id);
          this.totalRows--;
        }
        this.modalRef.hide();
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      }, err => console.log(err));
    }
  }

  openModal(template: TemplateRef<any>, entity: any) {
    if (entity) {
      this.formEntity.setValue(
        {
          Id: entity.Id,
          FullName: entity.FullName,
          PhoneNumber: entity.PhoneNumber,
          BirthDay: entity.BirthDay,
          Email: entity.Email,
          Status: entity.Status,
          Gender: entity.Gender,
          Avatar: entity.Avatar,
          Address: entity.Address,
          UserName: entity.UserName,
          Password: entity.Password,
          Roles: "Admin"
        }
      );
    }
    this.modalRef = this.modalService.show(template);
  }

  openModalConfirm(template: TemplateRef<any>, entity: any) {
    this.modalRef = this.modalService.show(template);
    this.entityCurrent = entity;
  }
}

