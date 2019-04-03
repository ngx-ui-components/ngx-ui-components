import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {
  GoogleAnalyticsModule,
  CookieLawConsentModule,
  ReadingProgressBarModule,
  LazyTemplateModule,
} from 'projects/ngx-ui-components/src/public-api';

import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { MenuLazyTemplateComponent } from './lazy-template/menu/menu.component';
import { LazyPicturesComponent } from './lazy-template/pictures/lazy-pictures.component';
import { LazyComponentsComponent } from './lazy-template/components/lazy-components.component';
import { DateComponent } from './lazy-template/components/date/date.component';
import { LazyTemplatesComponent } from './lazy-template/lazy-template.component';
import { NgRepeatDirective } from './lazy-template/components/ng-repeat.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LazyComponentsComponent,
    LazyTemplatesComponent,
    MenuLazyTemplateComponent,
    LazyPicturesComponent,
    HomeComponent,
    DateComponent,
    ReadingProgressBarComponent,
    NgRepeatDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CookieLawConsentModule.forRoot(),
    GoogleAnalyticsModule.forRoot('UA-32348844-1'),
    ReadingProgressBarModule,
    LazyTemplateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
