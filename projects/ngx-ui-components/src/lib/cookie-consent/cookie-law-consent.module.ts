import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieLawConsentComponent } from './cookie-law-consent/cookie-law-consent.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CookieConsentService } from './cookie-consent.service';
import { CookieLawConsentConfig, cookieLawConsentOptions, USER_COOKIE_LAW_CONSENT_CONFIG, COOKIE_LAW_CONSENT_CONFIG } from './config.model';

import { mergeDeep } from '../shared/utils';
import { SharedModule } from '../shared/shared.module';
import { GoogleAnalyticsModule } from '../google-analytics/google-analytics.module';

const ngxDeclarations = [CookieLawConsentComponent];

export function mergeConfig(config: CookieLawConsentConfig) {
  if (config === null || typeof config === 'undefined') {
    config = {};
  }
  return mergeDeep(cookieLawConsentOptions, config);
}

@NgModule({
  declarations: [...ngxDeclarations],
  imports: [CommonModule, SharedModule, GoogleAnalyticsModule.forChild()],
  exports: [...ngxDeclarations],
})
export class CookieLawConsentModule {
  static forRoot(config?: CookieLawConsentConfig): ModuleWithProviders {
    return {
      ngModule: CookieLawConsentModule,
      providers: [
        { provide: USER_COOKIE_LAW_CONSENT_CONFIG, useValue: config },
        { provide: COOKIE_LAW_CONSENT_CONFIG, useFactory: mergeConfig, deps: [USER_COOKIE_LAW_CONSENT_CONFIG] },
        CookieConsentService,
      ],
    };
  }
}
