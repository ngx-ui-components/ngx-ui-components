import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  Query,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-ui-star-rater',
  templateUrl: './star-rater.component.html',
  styleUrls: ['./star-rater.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRaterComponent),
      multi: true,
    },
  ],
})
export class StarRaterComponent implements ControlValueAccessor, AfterViewInit {
  public ratings = [
    {
      stars: 1,
      text: 'must GTFO ASAP',
      color: '#ff3722',
    },
    {
      stars: 2,
      text: 'meh',
      color: '#ff8622',
    },
    {
      stars: 3,
      text: "it's ok",
      color: '#ffce00',
    },
    {
      stars: 4,
      text: "I'd be sad if a black hole ate it",
      color: '#73cf11',
    },
    {
      stars: 5,
      text: '10/10 would write review on Amazon',
      color: '#00b67a',
    },
  ];

  constructor(private renderer: Renderer2) {}

  @ViewChildren('poly') star!: QueryList<'poly'>;

  displayText: string;

  public disabled: boolean;
  public ratingText: string;
  public _value: number;

  onChanged: any = () => {};
  onTouched: any = () => {};

  ngAfterViewInit() {
    this.init();
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', '#d8d8d8');
    }
    this.displayText = '';
  }

  onMouseOver(currentStar: any) {
    for (let i = 0; i < 5; i++) {
      this.renderer.removeStyle((this.star.toArray()[i] as any).nativeElement, 'fill');
      if (i + 1 <= currentStar.stars) {
        this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', currentStar.color);
      } else {
        this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', '#d8d8d8');
      }
    }
    this.displayText = currentStar.text;
  }

  onMouseOut() {
    if (!this._value) {
      this.init();
    }
  }

  writeValue(val) {
    this._value = val;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(star: any) {
    if (!this.disabled) {
      this._value = star.stars;
      this.ratingText = star.text;
      this.onChanged(star.stars);
      this.onTouched();
    }
  }
}
