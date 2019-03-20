import { Component, OnInit } from '@angular/core';
import { GaService } from 'projects/ngx-ui-components/src/public-api';
import { CookieConsentService } from 'projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  opened = false;

  constructor(private cookieConsentService: CookieConsentService, private gaService: GaService) {}

  ngOnInit() {
    this.gaService.sendPage(document.location.pathname);
    /* this.cookieConsentService.popupOpen$.subscribe(typeMessage => {
      this.opened = true;
    }); */
  }
}
