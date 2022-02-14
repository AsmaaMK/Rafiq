import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function beginWithChar(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstChar = (control?.value)[0];
    return isChar(firstChar) ? null : { beginWithChar: { value: control.value } };
  };
}

function isChar(char: string) {
  return (char >= 'a' && char <= 'z');
}