import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractsComponent } from './delete-contracts.component';

describe('DeleteContractsComponent', () => {
  let component: DeleteContractsComponent;
  let fixture: ComponentFixture<DeleteContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
