import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { SharedModule } from './shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class BrowserService {
  constructor(@Inject(PLATFORM_ID) private platformId: InjectionToken<object>) {}

  // Grap IE version, -1 if it's not IE browser or null if we are not in a browser
  getInternetExplorerVersion(): number {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      const ua = navigator.userAgent;
      const re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
      }
    } else if (navigator.appName === 'Netscape') {
      const ua = navigator.userAgent;
      const re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }

  // The user doesn't want to be tracked
  hasDoNotTrack(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (
      (navigator.doNotTrack && (navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1')) ||
      // tslint:disable-next-line: no-string-literal
      (navigator['msDoNotTrack'] && navigator['msDoNotTrack'] === '1')
    ) {
      return true;
    } else {
      return false;
    }
  }

  // the consent is obtained
  acceptToTrack(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return navigator.doNotTrack && (navigator.doNotTrack === 'no' || navigator.doNotTrack === '0');
    }
  }
}
