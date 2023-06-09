import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCalendarComponent } from './company-calendar.component';

describe('CompanyCalendarComponent', () => {
  let component: CompanyCalendarComponent;
  let fixture: ComponentFixture<CompanyCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
