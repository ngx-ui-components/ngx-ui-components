import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieLawConsentComponent } from './cookie-law-consent.component';

describe('CookieLawComplianceComponent', () => {
  let component: CookieLawConsentComponent;
  let fixture: ComponentFixture<CookieLawConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CookieLawConsentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieLawConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
