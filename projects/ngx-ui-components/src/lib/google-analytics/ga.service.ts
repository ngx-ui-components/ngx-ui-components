import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { WindowToken } from '../shared/window';
import { GA_PROPERTY, GoogleAnalyticsModule } from './google-analytics.module';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from '../shared/cookie.service';
import { DOCUMENT } from '@angular/common';

// see https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
@Injectable({
  providedIn: GoogleAnalyticsModule,
})
export class GaService {
  private previousUrl: string;

  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    @Inject(GA_PROPERTY) private gaProperty: string,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
    private cookieService: CookieService,
  ) {}

  sendPage(url: string) {
    if (url === this.previousUrl) {
      return;
    }
    this.previousUrl = url;
    this.ga('set', 'page', '/' + url);
    this.ga('send', 'pageview');
  }

  setPage(url: string) {
    this.ga('set', 'page', '/' + url);
  }

  sendPageView() {
    this.ga('send', 'pageview');
  }

  sendEvent(source: string, action: string, label?: string, value?: number) {
    this.ga('send', 'event', source, action, label, value);
  }

  ga(...args: any[]) {
    // tslint:disable-next-line: no-string-literal
    const gaFn = (this.window as any)['ga'];
    if (gaFn) {
      gaFn(...args);
    }
  }

  startGoogleAnalytics() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    /* tslint:disable:no-string-literal */
    /* tslint:disable: only-arrow-functions */
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (i[r].l = 1 * <any>new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(this.window, this.document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    this.window['ga']('create', this.gaProperty, 'auto');
    /* tslint:enable:no-string-literal */
    /* tslint:enable: only-arrow-functions */
  }

  callGABeforeConsent() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    /* tslint:disable:no-string-literal */
    /* tslint:disable: only-arrow-functions */
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (i[r].l = 1 * <any>new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(this.window, this.document, 'script', 'https://www.google-analytics.com/analytics.js', '__gaTracker');
    this.window['__gaTracker']('create', this.gaProperty, { storage: 'none', clientId: '0' });
    this.window['__gaTracker']('set', 'anonymizeIp', true);

    // tslint:disable-next-line: object-literal-key-quotes
    this.window['__gaTracker']('send', 'pageview');
    /* tslint:enable:no-string-literal */
    /* tslint:enable: only-arrow-functions */
  }

  // Efface tous les types de cookies utilisés par Google Analytics
  deleteAnalyticsCookies() {
    const cookieNames = ['__utma', '__utmb', '__utmc', '__utmz', '_ga', '_gat'];
    for (const cookie of cookieNames) {
      this.cookieService.deleteCookie(cookie);
    }
  }
}
