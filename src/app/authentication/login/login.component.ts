import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailOrUsername } from 'src/app/shared/validators/email-or-username.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fieldTextType = false;
  seenIconPath = '../../../assets/icons/visibility.svg';

  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required, 
        emailOrUsername()
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
        Validators.minLength(8),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  login() {
    console.warn(this.loginForm.value);
  }

  togglePasswordType() {
    this.fieldTextType = !this.fieldTextType;

    this.seenIconPath = this.fieldTextType
      ? '../../../assets/icons/Seen.svg'
      : '../../../assets/icons/visibility.svg';
  }

  unShowMessage = false;
  passwordShowMessage = false;
}
