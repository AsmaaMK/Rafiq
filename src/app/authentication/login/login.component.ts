import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUserName: new FormControl('', [
        Validators.required,
        emailOrUsername()
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
        Validators.minLength(8),
      ])
    });
  }

  get emailOrUserName() {
    return this.loginForm.get('emailOrUserName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordType() {
    this.fieldTextType = !this.fieldTextType;

    this.seenIconPath = this.fieldTextType
      ? '../../../assets/icons/Seen.svg'
      : '../../../assets/icons/visibility.svg';
  }

  unShowMessage = false;
  passwordShowMessage = false;
  rememberMe = true;

  checked() {
    this.rememberMe = !this.rememberMe;
  }

  login(): void {
    this.auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          console.log();
          const refreshToken: string = (res.results?.refreshToken) || '';
          localStorage.setItem('refreshToken', refreshToken);
          console.log(localStorage.getItem('refreshToken'))
        },
        err => {
          console.error(err);
        }
      )
  }
}
