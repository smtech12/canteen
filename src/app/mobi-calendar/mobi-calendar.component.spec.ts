import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobiCalendarComponent } from './mobi-calendar.component';

describe('MobiCalendarComponent', () => {
  let component: MobiCalendarComponent;
  let fixture: ComponentFixture<MobiCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobiCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
