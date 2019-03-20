import { CookieOptions } from '../shared/cookie-config.model';
import { InjectionToken } from '@angular/core';

export type PositionType = 'top' | 'bottom';

export const USER_COOKIE_LAW_CONSENT_CONFIG = new InjectionToken<CookieLawConsentConfig>('Cookie Law Consent Config Default');
export const COOKIE_LAW_CONSENT_CONFIG = new InjectionToken<CookieLawConsentConfig>('Cookie Law Consent Config');

export interface CookieLawConsentConfig {
  // cookie options - set these values to correspond with your server's strategy
  cookie?: CookieOptions;
  // position of the banner. The value can be `top` or `bottom`. Default value `bottom`
  position?: PositionType;
  // Create a cookie with value `dismiss` when the user scroll on the page. Default value `false`
  dismissOnScroll?: boolean;
  // Allow Google Analytics tracking on dismiss
  allowOnDismiss?: boolean;
  // Message to be shown when the user come
  askConsentText?: string;
  // Message to be shown when the user has doNotTrack option in his browser
  doNotTrackText?: string;
  // The application automatically decide whether the popup should open. Default value `true`
  autoOpen?: boolean;
  acceptButtonText?: string;
  acceptButton?: boolean;
  declineButtonText?: string;
  declineButton?: boolean;
}

export const enum StatusConsent {
  // When cookies are accepted
  Allow = 'Allow',
  // When cookies are declined
  Deny = 'Deny',
  // When cookies banner is closed without response
  Dismiss = 'Dismiss',
}

export const enum TypeMessage {
  hasDoNotTrack = 'hasDoNotTrack',
  askConsent = 'askConsent',
}

export const cookieLawConsentOptions: CookieLawConsentConfig = {
  cookie: new CookieOptions(),
  position: 'bottom',
  dismissOnScroll: false,
  allowOnDismiss: true,
  autoOpen: true,
  acceptButton: true,
  declineButton: true,
  // tslint:disable-next-line: max-line-length
  askConsentText: `We use cookies to improve your experience on our site. To find out more, read our cookie policy. By clicking "I accept" on this banner, or using our site, you consent to the use of cookies unless you have disabled them.`,
  doNotTrackText: `The feature called Do Not Track is enabled on your browser. You're not being tracked !`,
  acceptButtonText: 'I accept',
  declineButtonText: 'I decline',
};
