import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePropertyTypeComponent } from './delete-property-type.component';

describe('DeletePropertyTypeComponent', () => {
  let component: DeletePropertyTypeComponent;
  let fixture: ComponentFixture<DeletePropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePropertyTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
