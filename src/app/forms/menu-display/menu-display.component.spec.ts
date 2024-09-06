import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuDisplayComponent } from './menu-display.component';

describe('MenuDisplayComponent', () => {
  let component: MenuDisplayComponent;
  let fixture: ComponentFixture<MenuDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
