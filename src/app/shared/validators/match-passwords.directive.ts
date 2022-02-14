import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswords(password1: string, password2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const passwordInput1 = formGroup.get(password1);
    const passwordInput2 = formGroup.get(password2);
    
    return passwordInput1?.value === passwordInput2?.value
      ? null
      : { matchPasswords: { value: control.value } };
  };
}