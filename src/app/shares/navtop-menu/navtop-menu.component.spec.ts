import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtopMenuComponent } from './navtop-menu.component';

describe('NavtopMenuComponent', () => {
  let component: NavtopMenuComponent;
  let fixture: ComponentFixture<NavtopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavtopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
