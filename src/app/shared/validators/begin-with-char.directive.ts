import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function beginWithChar(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstChar = (control?.value)[0];
    return isLetter(firstChar) ? null : { beginWithChar: { value: control.value } };
  };
}

function isLetter(char: string) {
  return ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'));
}