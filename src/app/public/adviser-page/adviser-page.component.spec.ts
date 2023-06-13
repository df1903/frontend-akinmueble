import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserPageComponent } from './adviser-page.component';

describe('AdminPageComponent', () => {
  let component: AdviserPageComponent;
  let fixture: ComponentFixture<AdviserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
