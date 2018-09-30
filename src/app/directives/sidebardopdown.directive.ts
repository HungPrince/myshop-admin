import { Directive, HostListener, Input, ViewChild } from '@angular/core';

declare var $;

@Directive({
  selector: '[appsidebardropdown]'
})
export class SidebardropdownDirective {

  @ViewChild('.child_menu') childMenu;
  @Input('menuName') menuName: string;
  constructor() {
  }

  @HostListener('click') toggleOpen() {
    $(this.menuName).addClass('block');
  }
}
