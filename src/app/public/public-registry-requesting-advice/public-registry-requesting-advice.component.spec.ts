import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRegistryRequestingAdviceComponent } from './public-registry-requesting-advice.component';

describe('PublicRegistryRequestingAdviceComponent', () => {
  let component: PublicRegistryRequestingAdviceComponent;
  let fixture: ComponentFixture<PublicRegistryRequestingAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicRegistryRequestingAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicRegistryRequestingAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
