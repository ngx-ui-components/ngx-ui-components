import { Injectable, Inject, Optional } from '@angular/core';
import { CookieService } from '../shared/cookie.service';
import { CookieLawConsentConfig, StatusConsent, TypeMessage, COOKIE_LAW_CONSENT_CONFIG } from './config.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { BrowserService } from '../shared/browser.service';
import { filter, debounceTime, take } from 'rxjs/operators';
import { GaService } from '../google-analytics/ga.service';
import { GoogleAnalyticsModule } from '../google-analytics/google-analytics.module';
import { ScrollService } from '../shared/scroll.service';

@Injectable({
  providedIn: GoogleAnalyticsModule,
})
export class CookieConsentService {
  popupOpenSubject = new BehaviorSubject<TypeMessage>(null);
  statusChangeSubject = new Subject<StatusConsent>();
  denyChoiceSubject = new Subject<void>();
  acceptCookieSubject = new Subject<void>();
  dismissChoiceSubject = new Subject<void>();

  popupOpen$ = this.popupOpenSubject.asObservable().pipe(filter(type => type !== null));
  statusChange$ = this.statusChangeSubject.asObservable();
  denyChoice$ = this.denyChoiceSubject.asObservable();
  acceptCookie$ = this.acceptCookieSubject.asObservable();
  dismissChoice$ = this.dismissChoiceSubject.asObservable();

  constructor(
    @Inject(COOKIE_LAW_CONSENT_CONFIG) private cookieLawConsentConfig: CookieLawConsentConfig,
    private cookieService: CookieService,
    private browserService: BrowserService,
    private scrollService: ScrollService,
    @Optional() private gaService: GaService,
  ) {
    this.init();
  }

  init() {
    const cookieLawConsent = this.cookieService.get(this.cookieLawConsentConfig.cookie.name);

    if (!cookieLawConsent) {
      if (this.browserService.hasDoNotTrack()) {
        this.doNotTrackerHandler();
      } else if (this.browserService.acceptToTrack()) {
        this.allowTrackingHandler();
      } else {
        // We call GA with `anonymizeIp`option
        this.gaService.callGABeforeConsent();
        this.popupOpenSubject.next(TypeMessage.askConsent);
      }
    } else {
      if (cookieLawConsent === StatusConsent.Allow) {
        this.allowTrackingHandler();
      } else if (cookieLawConsent === StatusConsent.Deny) {
        this.denyTrackingHandler();
      } else {
        this.dismissTrackingHandler();
      }
    }
  }

  private doNotTrackerHandler() {
    // We call GA with `anonymizeIp`option
    this.gaService.callGABeforeConsent();
    this.popupOpenSubject.next(TypeMessage.hasDoNotTrack);
    this.deny();
    this.scrollService.scrollEvent$
      .pipe(
        take(1),
        debounceTime(1000),
      )
      .subscribe(() => {
        this.statusChangeSubject.next(StatusConsent.Deny);
      });
  }

  private allowTrackingHandler() {
    this.acceptCookieSubject.next();
    if (this.gaService) {
      this.gaService.startGoogleAnalytics();
    }
  }

  private denyTrackingHandler() {
    // We call GA with `anonymizeIp`option
    this.gaService.callGABeforeConsent();
    this.denyChoiceSubject.next();
    if (this.gaService) {
      this.gaService.deleteAnalyticsCookies();
    }
  }

  private dismissTrackingHandler() {
    this.dismissChoiceSubject.next();
    if (this.gaService) {
      if (this.cookieLawConsentConfig.allowOnDismiss) {
        this.gaService.startGoogleAnalytics();
      } else {
        this.gaService.deleteAnalyticsCookies();
        this.gaService.callGABeforeConsent();
      }
    }
  }

  accept() {
    this.cookieService.set(this.cookieLawConsentConfig.cookie.name, StatusConsent.Allow);
    if (this.gaService) {
      this.gaService.startGoogleAnalytics();
    }
    this.statusChangeSubject.next(StatusConsent.Allow);
  }

  deny() {
    this.cookieService.set(this.cookieLawConsentConfig.cookie.name, StatusConsent.Deny);
    if (this.gaService) {
      this.gaService.deleteAnalyticsCookies();
    }
    this.statusChangeSubject.next(StatusConsent.Deny);
  }

  dismiss() {
    this.cookieService.set(this.cookieLawConsentConfig.cookie.name, StatusConsent.Dismiss);
    if (this.gaService) {
      if (this.cookieLawConsentConfig.allowOnDismiss) {
        this.gaService.startGoogleAnalytics();
      } else {
        this.gaService.deleteAnalyticsCookies();
      }
      this.statusChangeSubject.next(StatusConsent.Dismiss);
    }
  }

  isAccepted(): boolean {
    return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === StatusConsent.Allow.toString();
  }

  isDismiss(): boolean {
    return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === StatusConsent.Dismiss.toString();
  }

  isDeny(): boolean {
    return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === StatusConsent.Deny.toString();
  }

  isPresent(): boolean {
    return this.cookieService.check(this.cookieLawConsentConfig.cookie.name);
  }
}
