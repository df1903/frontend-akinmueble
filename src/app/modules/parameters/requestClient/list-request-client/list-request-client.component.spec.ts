import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestClientComponent } from './list-request-client.component';

describe('ListRequestClientComponent', () => {
  let component: ListRequestClientComponent;
  let fixture: ComponentFixture<ListRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequestClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
