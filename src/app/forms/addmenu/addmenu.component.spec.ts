import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddmenuComponent } from './addmenu.component';

describe('AddmenuComponent', () => {
  let component: AddmenuComponent;
  let fixture: ComponentFixture<AddmenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
