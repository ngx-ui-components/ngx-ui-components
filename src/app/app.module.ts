import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { GoogleAnalyticsModule, CookieLawConsentModule, ReadingProgressBarModule } from 'projects/ngx-ui-components/src/public-api';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookieLawConsentModule.forRoot(),
    GoogleAnalyticsModule.forRoot('UA-32348844-1'),
    ReadingProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
