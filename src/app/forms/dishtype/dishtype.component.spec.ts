import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DishtypeComponent } from './dishtype.component';

describe('DishtypeComponent', () => {
  let component: DishtypeComponent;
  let fixture: ComponentFixture<DishtypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DishtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
