import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyTypeComponent } from './create-property-type.component';

describe('CreatePropertyTypeComponent', () => {
  let component: CreatePropertyTypeComponent;
  let fixture: ComponentFixture<CreatePropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropertyTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
