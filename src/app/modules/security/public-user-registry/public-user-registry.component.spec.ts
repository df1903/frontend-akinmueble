import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserRegistryComponent } from './public-user-registry.component';

describe('PublicUserRegistryComponent', () => {
  let component: PublicUserRegistryComponent;
  let fixture: ComponentFixture<PublicUserRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicUserRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicUserRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
