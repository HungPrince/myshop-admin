import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private elementRef : ElementRef) { }

  ngAfterViewInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login");
    body.classList.add("nav-md");
    let s = document.createElement('script');
    s.src = "../assets/js/custom.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
