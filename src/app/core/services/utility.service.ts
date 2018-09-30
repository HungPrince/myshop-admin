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

}
