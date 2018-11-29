import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class UtilityService {

  constructor() {
    this.TestUnFlaten();
  }

  unFlatten = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      let node = arr[i];
      node.children = [];
      map[node.ID] = i;
      if (node.ParentId !== null) {
        arr[map[node.ParentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  TestUnFlaten() {
    let arr = [
      {
        ID: '1', Name: 'A', ParentId: null
      },
      {
        ID: '2', Name: 'B', ParentId: '1'
      },
      {
        ID: '3', Name: 'C', ParentId: '2'
      },
      {
        ID: '4', Name: 'D', ParentId: '1'
      },
    ]
    this.unFlatten(arr);
  }

  Unflatten2 = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (var i = 0; i < arr.length; i += 1) {
      let node = arr[i];
      node.children = [];
      map[node.ID] = i; // use map to look-up the parents
      if (node.ParentID !== null) {
        arr[map[node.ParentID]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  
  MakeSeoTitle(input: string) {
    if (input == undefined || input == '')
      return '';
    //Đổi chữ hoa thành chữ thường
    var slug = input.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
  }

}
