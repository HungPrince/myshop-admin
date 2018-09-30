import { SystemConstant } from './../../core/constants/constant';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewChildren, ViewContainerRef, Renderer2 } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FormHelper } from '../../core/helpers/form.helper';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/constants/messages';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UploadService } from '../../core/services/upload/upload.service';
import { MomentHelper } from '../../core/helpers/moment.helper';
import { AuthService } from '../../core/services/auth.service';

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
  @ViewChild(BsDatepickerDirective) bsDatepicker: BsDatepickerDirective;
  @ViewChild('staticModal') staticModal: ModalDirective;
  @ViewChild('avatar') avatar: ElementRef;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  BASE_FOLDER = SystemConstant.BASE_URL;

  private emailRegex = "^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$";
  private phoneRegex = "^(01[2689]|09)[0-9]{8}$"
  private passwordRegex = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  constructor(
    private dataService: DataService,
    public  authService: AuthService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private formHelper: FormHelper,
    private notificationService: NotificationService,
    private uploadService: UploadService,
    private momentHelper: MomentHelper,
    private render :  Renderer2
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
      Password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      ConfirmPassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      PhoneNumber: ['', Validators.pattern(this.phoneRegex)],
      Gender: [true],
      BirthDay: ['',],
      Address: ['',],
      Avatar: [''],
      Status: [true],
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

  selectImage() {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.render.selectRootElement("#previewImage").src = e.target.result;
    }
    reader.readAsDataURL(this.avatar.nativeElement.files[0]);
  }

  saveChange() {
    if (this.formEntity.valid) {
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this.uploadService.postWithFile('api/upload/saveImage?type=avatar', null, fi.files).then(res => {
          if (res) {
            this.formEntity.value.Avatar = res;
            this.saveData();
          }
        })
      } else {
        this.saveData();
      }
    }
  }

  saveData() {
    let id = this.formEntity.value.Id;
    let uri = id ? "api/user/update" : "api/user/add";
    var arr = this.formEntity.value.Roles;
    this.formEntity.value.Roles = arr.map(x => {
      return x.Name ? x.Name : x
    });
    this.formEntity.value.BirthDay = this.momentHelper.convertDateMMDDYYYY(this.formEntity.value.BirthDay);
    let data = JSON.stringify(this.formEntity.value);
    if (id) {
      this.dataService.putData(uri, data).subscribe(res => {
        let index = this.entities.findIndex(x => x.Id == id);
        this.entities[index] = res;
        this.staticModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      });
    } else {
      this.dataService.postData(uri, data).subscribe(res => {
        this.entities.push(res);
        this.totalRows++;
        this.staticModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      });
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

  openModal(id: string) {
    if (id) {
      let uri = `api/user/detail/${id}`;
      this.dataService.getData(uri).subscribe(entity => {
        this.formEntity.removeControl('Password');
        this.formEntity.removeControl('ConfirmPassword');
        if (entity) {
          this.formEntity.setValue(
            {
              Id: entity.Id,
              FullName: entity.FullName,
              PhoneNumber: entity.PhoneNumber,
              BirthDay: this.momentHelper.convertDateMMDDYYYY(entity.BirthDay),
              Email: entity.Email,
              Status: entity.Status,
              Gender: entity.Gender,
              Avatar: entity.Avatar,
              Address: entity.Address,
              UserName: entity.UserName,
              Roles: entity.Roles
            }
          );
        }
      })
    } else {
      if (!this.formEntity.controls['Password']) {
        this.formEntity.addControl('Password', new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]));
        this.formEntity.addControl('ConfirmPassword', new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]));
      }
      this.formEntity.reset();
      this.formEntity.value.Gender = true;
    }
    this.staticModal.show();
  }

  openModalConfirm(template: TemplateRef<any>, entity: any) {
    this.modalRef = this.modalService.show(template);
    this.entityCurrent = entity;
  }
}

