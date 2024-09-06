import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuDishComponent } from './menu-dish.component';

describe('MenuDishComponent', () => {
  let component: MenuDishComponent;
  let fixture: ComponentFixture<MenuDishComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
