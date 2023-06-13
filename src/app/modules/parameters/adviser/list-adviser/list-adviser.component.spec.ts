import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdviserComponent } from './list-adviser.component';

describe('ListAdviserComponent', () => {
  let component: ListAdviserComponent;
  let fixture: ComponentFixture<ListAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdviserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
