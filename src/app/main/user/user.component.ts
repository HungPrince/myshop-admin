import { map } from 'rxjs/operators';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewChildren, ViewContainerRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../core/helpers/form.helper';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/constants/messages';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from "moment";
import { PasswordValidator } from '../../core/helpers/validators/password.validator';
import { UploadService } from '../../core/services/upload/upload.service';

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

  bsValue = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  private avatar: ElementRef;
  @ViewChild(BsDatepickerDirective) bsDatepicker: BsDatepickerDirective;
  @ViewChild('avatar') set content(content: ElementRef) {
    this.avatar = content;
  }
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  private emailRegex = "^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$";
  private phoneRegex = "^(01[2689]|09)[0-9]{8}$"
  private passwordRegex = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private formHelper: FormHelper,
    private notificationService: NotificationService,
    private uploadService: UploadService,
    private vcRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.loadData();
    this.initDropDownList();
    this.loadAllRoles();
    this.initForm();
  }

  initForm() {
    this.formEntity = this.formBuilder.group({
      Id: [''],
      FullName: ['', [Validators.required, Validators.minLength(4)]],
      UserName: ['', [Validators.required, Validators.minLength(4)]],
      Email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.pattern(this.phoneRegex)],
      Gender: [true],
      BirthDay: ['',],
      Address: ['',],
      Avatar: ['',],
      Status: ['',],
      Roles: []
    });
  }

  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Name',
      textField: 'Description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
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

  loadAllRoles() {
    this.dataService.getData(`api/role/GetListPaging?page=0&pageSize=${this.pageSize}&filter=${this.filter}`).subscribe(data => {
      if (data) {
        this.dropdownList = data;
      }
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

  isErrorPattern(nameInput: string) {
    return this.formHelper.isErrorPattern(this.formEntity, nameInput);
  }

  UploadImage() {
    let fi = this.avatar.nativeElement;
    console.log(fi.files);
    if (fi.files.length > 0) {
      this.uploadService.postWithFile('/api/upload/saveImage?type=avatar', null, fi.files)
    }
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
    this.vcRef.createEmbeddedView(template, this.avatar);

    if (entity) {
      this.formEntity.setValue(
        {
          Id: entity.Id,
          FullName: entity.FullName,
          PhoneNumber: entity.PhoneNumber,
          BirthDay: moment(entity.BirthDay).format("DD/MM/YYYY"),
          Email: entity.Email,
          Status: entity.Status,
          Gender: entity.Gender,
          Avatar: entity.Avatar,
          Address: entity.Address,
          UserName: entity.UserName,
          Password: entity.Password,
          ConfirmPassword: entity.ConfirmPassword ? entity.ConfirmPassword : '',
          Roles: entity.Roles
        }
      );
      this.selectedItems = entity.Roles;
    } else {
      this.formEntity.reset();
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  openModalConfirm(template: TemplateRef<any>, entity: any) {
    this.modalRef = this.modalService.show(template);
    this.entityCurrent = entity;
  }
}

