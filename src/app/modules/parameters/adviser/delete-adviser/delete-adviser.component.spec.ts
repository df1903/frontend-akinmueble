import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdviserComponent } from './delete-adviser.component';

describe('DeleteAdviserComponent', () => {
  let component: DeleteAdviserComponent;
  let fixture: ComponentFixture<DeleteAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdviserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
