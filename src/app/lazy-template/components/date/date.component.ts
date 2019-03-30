import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, tap, toArray, filter } from 'rxjs/operators';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  date: Date;

  ngOnInit() {
    this.date = new Date();
  }
}
