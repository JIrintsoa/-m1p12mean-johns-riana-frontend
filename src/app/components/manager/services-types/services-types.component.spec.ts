import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTypesComponent } from './services-types.component';

describe('ServicesTypesComponent', () => {
  let component: ServicesTypesComponent;
  let fixture: ComponentFixture<ServicesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
