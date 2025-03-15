import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFormsComponent } from './appointment-forms.component';

describe('AppointmentFormsComponent', () => {
  let component: AppointmentFormsComponent;
  let fixture: ComponentFixture<AppointmentFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
