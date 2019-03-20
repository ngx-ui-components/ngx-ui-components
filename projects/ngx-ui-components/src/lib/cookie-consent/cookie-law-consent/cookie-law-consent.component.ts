import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { TypeMessage, StatusConsent, CookieLawConsentConfig, COOKIE_LAW_CONSENT_CONFIG } from '../config.model';
import { CookieConsentService } from '../cookie-consent.service';
import { ScrollService } from '../../shared/scroll.service';
import { debounceTime, tap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'ngx-ui-cookie-law-consent',
  templateUrl: './cookie-law-consent.component.html',
  styleUrls: ['./cookie-law-consent.component.css'],
})
export class CookieLawConsentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() opened = false;

  @ViewChild('cookielawconsent') cookieLawConsent: ElementRef;

  typeMessage: TypeMessage;

  constructor(
    private renderer: Renderer2,
    public cookieConsentService: CookieConsentService,
    private scrollService: ScrollService,
    @Inject(COOKIE_LAW_CONSENT_CONFIG) public cookieLawConsentConfig: CookieLawConsentConfig,
  ) {}

  ngOnInit(): void {
    // Handle dismiss when the scroll event
    if (this.cookieLawConsentConfig.dismissOnScroll) {
      this.scrollService.scrollEvent$
        .pipe(
          take(1),
          debounceTime(1000),
          filter(() => !this.cookieConsentService.isPresent()),
        )
        .subscribe(() => {
          this.cookieConsentService.dismiss();
        });
    }
    // Handle autoOpen of the banner
    if (this.cookieLawConsentConfig.autoOpen) {
      this.cookieConsentService.popupOpen$.pipe(take(1)).subscribe(typeMessage => {
        this.typeMessage = typeMessage;
        this.opened = true;
      });
    } else {
      this.cookieConsentService.popupOpen$.pipe(take(1)).subscribe(typeMessage => {
        this.typeMessage = typeMessage;
      });
    }
    // Close the banner when the status change
    this.cookieConsentService.statusChange$.pipe(take(1)).subscribe((status: StatusConsent) => (this.opened = false));
  }

  ngAfterViewInit(): void {
    if (this.cookieLawConsent) {
      this.renderer.setStyle(this.cookieLawConsent.nativeElement, this.cookieLawConsentConfig.position, '0');
    }
  }

  ngOnDestroy(): void {}
}
