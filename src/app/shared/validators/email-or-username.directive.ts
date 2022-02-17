import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailOrUsername(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const input = (control?.value);
    const isValidInput = validUsername(input) || validEmail(input);
    
    return isValidInput ? null : { validInput: { value: control.value } };
  };
}


function validUsername(input: string) {
  const firstChar = input[0];
  const beginWithChar = (firstChar >= 'a' && firstChar <= 'z');
  const isValidUsername = /^([a-z]|_|[0-9])+$/.test(input);
  const length = input.length;

  return beginWithChar && isValidUsername && (length >= 3 && length <= 35);
}

function validEmail(input: string) {
  const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input);
  return isValidEmail;
}