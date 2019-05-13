import { ControlValueAccessor } from '@angular/forms';

export class SliderComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {}
}
