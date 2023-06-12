import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyTypeComponent } from './list-property-type.component';

describe('ListPropertyTypeComponent', () => {
  let component: ListPropertyTypeComponent;
  let fixture: ComponentFixture<ListPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropertyTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
