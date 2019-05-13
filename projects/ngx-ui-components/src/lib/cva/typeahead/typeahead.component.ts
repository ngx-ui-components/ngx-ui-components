import { ControlValueAccessor } from '@angular/forms';

export class TypeaheadComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {}
}
