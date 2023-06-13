import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractsComponent } from './create-contracts.component';

describe('CreateContractsComponent', () => {
  let component: CreateContractsComponent;
  let fixture: ComponentFixture<CreateContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
