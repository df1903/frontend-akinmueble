import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestClientComponent } from './edit-request-client.component';

describe('EditRequestClientComponent', () => {
  let component: EditRequestClientComponent;
  let fixture: ComponentFixture<EditRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRequestClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
