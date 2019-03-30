import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lazy-pictures',
  templateUrl: './lazy-pictures.component.html',
  styleUrls: ['./lazy-pictures.component.scss'],
})
export class LazyPicturesComponent {
  numArr = Array.from(Array(100), (_, x) => x);

  constructor(public element: ElementRef) {}

  get numImages(): number {
    return this.element.nativeElement.querySelectorAll('img').length;
  }
}
