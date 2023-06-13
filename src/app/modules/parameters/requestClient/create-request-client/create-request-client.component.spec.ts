import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestClientComponent } from './create-request-client.component';

describe('CreateRequestClientComponent', () => {
  let component: CreateRequestClientComponent;
  let fixture: ComponentFixture<CreateRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequestClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
