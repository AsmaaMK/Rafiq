import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { beginWithChar } from 'src/app/shared/validators/begin-with-char.directive';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { matchPasswords } from 'src/app/shared/validators/match-passwords.directive';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  allCountries!: string[];

  constructor(private countries: CountriesService, private auth: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
          Validators.pattern('[a-zA-Z]+'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
          Validators.pattern('[a-zA-Z]+'),
        ]),
        userName: new FormControl('', [
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(3),
          Validators.pattern('([a-zA-Z]|_|[0-9])+'),
          beginWithChar(),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
      },
      [matchPasswords('password', 'confirmPassword')]
    );

    this.allCountries = this.countries.getAllCountries();
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get userName() {
    return this.signUpForm.get('userName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  get country() {
    return this.signUpForm.get('country');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  get dateOfBirth() {
    return this.signUpForm.get('dateOfBirth');
  }

  
  passwordType = false;
  confirmPasswordType = false;
  passwordIconPath = '../../../../../assets/icons/visibility.svg';
  confirmpasswordIconPath = '../../../../../assets/icons/visibility.svg';

  togglePasswordType() {
    this.passwordType = !this.passwordType;

    this.passwordIconPath = this.passwordType
      ? '../../../../../assets/icons/Seen.svg'
      : '../../../../../assets/icons/visibility.svg';
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;

    this.confirmpasswordIconPath = this.confirmPasswordType
    ? '../../../../../assets/icons/Seen.svg'
      : '../../../../../assets/icons/visibility.svg';
  }
  
  fnShowMessage = false;
  lnShowMessage = false;
  unShowMessage = false;
  emailShowMessage = false;
  passwordShowMessage = false;
  confirmPasswordShowMessage = false;
  countryShowMessage = false;
  genderShowMessage = false;
  dateShowMessage = false;


  signUp() {
    this.auth.registerUser(this.signUpForm.value)
  }
}
