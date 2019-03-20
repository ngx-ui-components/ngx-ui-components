import { Directive, Renderer2, ElementRef, OnInit, Inject, OnDestroy } from '@angular/core';
import { ScrollService } from '../shared/scroll.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// see https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
@Directive({
  selector: '[ngxUiReadingProgressBar]',
})
export class ReadingProgressBarDirective implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private scrollService: ScrollService,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'width', '0%');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

    this.scrollService.scrollEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.computeWidth());
    this.scrollService.resizeEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.computeWidth());
  }

  computeWidth() {
    const heightMax = this.document.body.clientHeight;
    const currentScrollPosition = this.viewportScroller.getScrollPosition();
    const ratioCurrentHeight = Math.round((currentScrollPosition[1] / (heightMax - window.innerHeight)) * 100);
    this.renderer.setStyle(this.el.nativeElement, 'width', ratioCurrentHeight + '%');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
