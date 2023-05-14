import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashVerificationComponent } from './hash-verification.component';

describe('HashVerificationComponent', () => {
  let component: HashVerificationComponent;
  let fixture: ComponentFixture<HashVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HashVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
