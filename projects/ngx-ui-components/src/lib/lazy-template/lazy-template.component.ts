import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ngx-ui-lazy-template',
  template: `
    <ng-container *ngIf="isInView" [ngTemplateOutlet]="template"></ng-container>
  `,
  styles: [':host {display: block;}'],
})
export class LazyTemplateComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  isInView = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() options: any = { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8] };
  @Output() inView: EventEmitter<any> = new EventEmitter();
  @Output() notInView: EventEmitter<any> = new EventEmitter();

  constructor(public element: ElementRef, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.isInView = true;
        this.inView.emit(entry);
      } else {
        this.notInView.emit(entry);
      }
    });
  }
}
