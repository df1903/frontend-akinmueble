import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuarantorComponent } from './edit-guarantor.component';

describe('EditGuarantorComponent', () => {
  let component: EditGuarantorComponent;
  let fixture: ComponentFixture<EditGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGuarantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
