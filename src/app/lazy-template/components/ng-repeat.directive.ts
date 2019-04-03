import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[ngRepeat]' })
export class NgRepeatDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  @Input() set ngRepeat(repeat: number) {
    for (let i = 0; i < repeat; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
