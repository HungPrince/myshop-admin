import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class UtilityService {

  constructor() { }

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

}
