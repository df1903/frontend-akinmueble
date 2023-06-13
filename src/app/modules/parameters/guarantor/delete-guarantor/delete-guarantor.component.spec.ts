import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGuarantorComponent } from './delete-guarantor.component';

describe('DeleteGuarantorComponent', () => {
  let component: DeleteGuarantorComponent;
  let fixture: ComponentFixture<DeleteGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGuarantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
