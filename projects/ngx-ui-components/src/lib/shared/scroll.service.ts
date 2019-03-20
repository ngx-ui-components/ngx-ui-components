import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';
import { SharedModule } from './shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class ScrollService {
  readonly scrollEvent$: Observable<Event>;
  readonly resizeEvent$: Observable<Event>;

  constructor(private viewportScroller: ViewportScroller) {
    this.scrollEvent$ = fromEvent(window, 'scroll') as Observable<Event>;
    this.resizeEvent$ = fromEvent(window, 'resize') as Observable<Event>;
  }
}
