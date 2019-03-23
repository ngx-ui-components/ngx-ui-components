# Ngx-ui-components

## Demo

https://ngx-ui-components.github.io

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## About

Ngx-ui-components is a UI library usable with the Angular framework. Ngx-ui-components's vocation is to provide a bunch of components for everyday use. Ngx-ui-components is tree-shakable, so, it's lightweight. Currently, Ngx-ui-components provides:

- Cookie consent: It's an Angular module for alerting users about the use of cookie for tracking on a website. This module try to respect cookie law relevant to EU. Optionally, it handles the de-identifying for Google Analitics.
- Google Analytics: It's a just an Angular service which handles the common use cases.
- Reading progress bar: This module adds a reading progress bar which helps users to see its progression when it scrolls in a page.

## Installation

Install through npm:

```
npm install ngx-ui-components
```

OR

```
yarn add ngx-ui-components
```

## Usage

### ReadingProgressBarModule Module

This module may be added in any module of your application. You just have to include this module in your application. For instance:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReadingProgressBarModule } from 'ngx-ui-components/reading-progress-bar';

@NgModule({
  imports: [BrowserModule, ReadingProgressBarModule],
})
export class AppModule {}
```

Under the hood, ReadingProgressBarModule offers one directive that you can apply on any DOM Element, generally a span or a div:

```html
<div class="progression" ngxUiReadingProgressBar></div>
```

You have to define a css class, for example, like this:

```css
.progression {
  margin: 0;
  padding: 0;
  top: 0;
  height: 4px;
  position: fixed;
  display: block;
  width: 0%;
  z-index: 12;
  background: #e9573f;
}
```

Now you have progress bar on the top of your page. It's just an example, you can change this css as you want.

### GoogleAnalyticsModule module

This module has to be added in your `AppModule` of your application like this:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleAnalyticsModule } from 'ngx-ui-components/google-analytics';

@NgModule({
  imports: [BrowserModule, GoogleAnalyticsModule.forRoot('UA-XXXXXXXX-X')],
})
export class AppModule {}
```

As you see, you have to use the `forRoot` method with, as parameter, your ID Google Analytics.

GoogleAnalyticsModule offers a simple service that allows:

- to track the location with `sendPage` method.
- to track user actions with `sendEnvent` method. You can read [this article](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) for further information.
- To insert the Google Analytics script in your app with `startGoogleAnalytics` method

You just have to inject `GaService` service and call these methods.

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private gaService: GaService) {}

  ngOnInit() {

    // Start Google Analytics
    this.gaService.startGoogleAnalytics();

    this.gaService.sendPage(location.pathname);
    this.gaService.sendEvent('send', 'event', 'Videos', 'play', 'Fall Campaign');


    this.gaService.setPage(location.pathname);
    ...
    this.gaService.sendPageView();

    // or you can simply call `ga` method that opens all GA's capacities
    this.gaService.ga('send', 'social', 'Facebook', 'like', 'http://myownpersonaldomain.com');


  }
}
```

### CookieLawConsentModule module

CookieLawConsentModule provides a simple way for handling the european law concerning the cookies and the private life.

This module has to be added in your `AppModule` of your application like this:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieLawConsentModule } from 'ngx-ui-components/cookie-consent';

@NgModule({
  imports: [BrowserModule, CookieLawConsentModule.forRoot()],
})
export class AppModule {}
```

As you see, you have to use the `forRoot` method. This method accepts a config object ot type `CookieLawConsentConfig`:

- `cookie: CookieOptions`: cookie options - set these values to correspond with your server's strategy.
- `position: PositionType`: position of the banner. The value can be `top` or `bottom`. Default value `bottom`.
- `dismissOnScroll: boolean`: Create a cookie with value `dismiss` when the user scroll on the page. Default value `false`.
- `allowOnDismiss: boolean`: Allow Google Analytics tracking on dismiss.
- `askConsentText: string`: Message to be shown when the user come.
- `doNotTrackText: string`: Message to be shown when the user has doNotTrack option in his browser.
- `autoOpen: boolean`: The application automatically decide whether the popup should open. Default value `true`.
- `acceptButtonText: string`: Label of the "accept" button.
- `acceptButton: boolean`: display the button if `true`. Default value `true`.
- `declineButtonText: string`: Label of the "decline" button.
- `declineButton: boolean`: display the button if `true`. Default value `true`.
- `gaProperty: string`: Le Google Analytic ID.

Using the feature could be straightforward since you just have to use the component `<ngx-ui-cookie-law-consent></ngx-ui-cookie-law-consent>` in your main template like this:

```html
<app-menu></app-menu>
<div class="progression" ngxUiReadingProgressBar></div>
<router-outlet></router-outlet>
<ngx-ui-cookie-law-consent></ngx-ui-cookie-law-consent>
```

but you can also choose to manage the banner manually thanks to the `autoOpen` action. In this case, you have to add a property binding of boolean type:

```html
<app-menu></app-menu>
<div class="progression" ngxUiReadingProgressBar></div>
<router-outlet></router-outlet>
<ngx-ui-cookie-law-consent [opened]="opened"></ngx-ui-cookie-law-consent>
```

and subscribe to an observable called `popupOpen$` like this:

```ts
export class ReadingProgressBarComponent implements OnInit {
  opened = false;

  constructor(private cookieConsentService: CookieConsentService) {}

  ngOnInit() {
    this.cookieConsentService.popupOpen$.subscribe(() => (this.opened = true));
  }
}
```

One final point concerning the `CookieOptions` object. It should be conform with your server and your legislation:

- `name`: the name of your cookie. Default value 'cookielawconsent'
- `path`: The cookie path. Default value '/'
- `domain`: The domain that the cookie 'name' belongs to. The cookie can only be read on this domain. Default value is empty
- `expires`: The cookies expire date, specified in days (specify -1 for no expiry). Default value `365`;
- `secure`: If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS. Default value `false`
- `sameSite`: SameSite prevents the browser from sending this cookie along with cross-site requests. Default value is empty

## License

MIT
