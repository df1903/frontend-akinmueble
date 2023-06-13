import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGuarantorComponent } from './list-guarantor.component';

describe('ListGuarantorComponent', () => {
  let component: ListGuarantorComponent;
  let fixture: ComponentFixture<ListGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGuarantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
