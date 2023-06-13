import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdviserComponent } from './edit-adviser.component';

describe('EditAdviserComponent', () => {
  let component: EditAdviserComponent;
  let fixture: ComponentFixture<EditAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdviserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
