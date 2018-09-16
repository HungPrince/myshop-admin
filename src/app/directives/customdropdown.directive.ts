import { Directive, HostListener, ElementRef, Input } from '@angular/core';

declare var $;

@Directive({
  selector: '[appcustomdropdown]'
})
export class CustomdropdownDirective {

  @Input('menuName') menuName: string;
  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter') toggleOpen() {
    $(this.menuName).addClass('show');
  }

  @HostListener('mouseleave') toggleClose() {
    $(this.menuName).removeClass('show');
  }

  @HostListener('click') toogleOpen() {
    $(this.menuName).toggle('show');
  }
}
