import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequestClientComponent } from './delete-request-client.component';

describe('DeleteRequestClientComponent', () => {
  let component: DeleteRequestClientComponent;
  let fixture: ComponentFixture<DeleteRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRequestClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
