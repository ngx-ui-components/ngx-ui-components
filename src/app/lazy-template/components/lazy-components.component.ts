import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, tap, toArray, filter } from 'rxjs/operators';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-lazy-components',
  templateUrl: './lazy-components.component.html',
  styleUrls: ['./lazy-components.component.scss'],
})
export class LazyComponentsComponent {
  numArr = new Array(100).fill(1);

  constructor(public element: ElementRef) {}
}
