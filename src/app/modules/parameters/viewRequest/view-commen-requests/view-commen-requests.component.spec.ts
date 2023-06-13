import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommenRequestsComponent } from './view-commen-requests.component';

describe('ViewCommenRequestsComponent', () => {
  let component: ViewCommenRequestsComponent;
  let fixture: ComponentFixture<ViewCommenRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommenRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
