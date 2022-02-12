import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  allCountries!: string[];
  passwordType = false;
  confirmPasswordType = false;
  passwordIconPath = '../../../assets/icons/visibility.svg';
  confirmpasswordIconPath = '../../../assets/icons/visibility.svg';

  constructor(private countries: CountriesService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });

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
  get date() {
    return this.signUpForm.get('date');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signUpForm.value);
  }

  togglePasswordType() {
    this.passwordType = !this.passwordType;

    this.passwordIconPath = this.passwordType
      ? '../../../assets/icons/Seen.svg'
      : '../../../assets/icons/visibility.svg';
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;

    this.confirmpasswordIconPath = this.confirmPasswordType
      ? '../../../assets/icons/Seen.svg'
      : '../../../assets/icons/visibility.svg';
  }
}
