import { AfterViewInit, Component, forwardRef, Input, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Rating {
  text: string;
  color: string;
}

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
  @Input() ratings: Rating[];

  @ViewChildren('poly') star: QueryList<'poly'>;

  displayText: string;

  disabled: boolean;
  ratingText: string;
  private value: number;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => this.init());
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val) {
    this.value = val;
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

  onMouseOver(currentStar: Rating, idx: number) {
    for (let i = 0; i < this.ratings.length; i++) {
      this.renderer.removeStyle((this.star.toArray()[i] as any).nativeElement, 'fill');
      if (i <= idx) {
        this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', currentStar.color);
      } else {
        this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', '#d8d8d8');
      }
    }
    this.displayText = currentStar.text;
  }

  onMouseOut() {
    if (!this.value) {
      this.init();
    }
  }

  setRating(index: number) {
    if (!this.disabled) {
      this.value = index;
      this.ratingText = this.ratings[index].text;
      this.onChanged(index);
      this.onTouched();
    }
  }

  private init() {
    for (let i = 0; i < this.ratings.length; i++) {
      this.renderer.setStyle((this.star.toArray()[i] as any).nativeElement, 'fill', '#d8d8d8');
    }
    this.displayText = '';
  }
}
