// Extract of https://github.com/7leads/ngx-cookie-service
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SharedModule } from './shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class CookieService {
  constructor(@Inject(DOCUMENT) private document: any, @Inject(PLATFORM_ID) private platformId: InjectionToken<object>) {}

  check(name: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      name = encodeURIComponent(name);
      const regExp: RegExp = this.getCookieRegExp(name);
      const exists: boolean = regExp.test(this.document.cookie);
      return exists;
    }
  }

  /**
   * @param key Cookie name
   * @returns the cookie value as string
   */
  get(name: string): string {
    if (this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this.document.cookie);

      return decodeURIComponent(result[1]);
    } else {
      return '';
    }
  }

  set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'Strict') {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieString += 'path=' + path + ';';
    }

    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }

    if (secure) {
      cookieString += 'secure;';
    }

    if (sameSite) {
      cookieString += 'sameSite=' + sameSite + ';';
    }

    this.document.cookie = cookieString;
  }

  deleteCookie(name: string, path?: string, domain?: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.set(name, '', new Date('Thu, 01-Jan-1970 00:00:01 GMT'), path, domain);
  }

  /**
   * @param name Cookie name
   * @returns RegExp for retrieving a value
   */
  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }
}
