import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { emailOrUsername } from 'src/app/shared/validators/email-or-username.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fieldTextType = false;
  seenIconPath = '../../../../../assets/auth-module/icons/visibility.svg';
  unShowMessage = false;
  passwordShowMessage = false;
  rememberMe = true;
  sendingRequest = new BehaviorSubject(false);
  showError = new BehaviorSubject(false);
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUserName: new FormControl('', [
        Validators.required,
        emailOrUsername(),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
        Validators.minLength(8),
      ]),
    });

    this.setRememberMe(this.rememberMe);
  }

  get emailOrUserName() {
    return this.loginForm.get('emailOrUserName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  setRememberMe(rememberMe: boolean): void {
    this.tokenStorage.setRememberMe(rememberMe);
  }

  togglePasswordType() {
    this.fieldTextType = !this.fieldTextType;

    this.seenIconPath = this.fieldTextType
      ? '../../../../../assets/auth-module/icons/Seen.svg'
      : '../../../../../assets/auth-module/icons/visibility.svg';
  }

  login() {
    this.sendingRequest.next(true);

    this.auth.loginUser(this.loginForm.value).subscribe(
      (res) => {
        const refreshToken = res.results?.refreshToken;
        const accessToken = res.results?.accessToken;

        if (refreshToken && accessToken) {
          this.tokenStorage.setRefreshToken(refreshToken);
          this.tokenStorage.setAccessToken(accessToken);
          this.auth.isLoggedIn$.next(true);
        }

        this.router.navigate(['/app/home']);
      },
      (err) => {
        this.errorMessage = err.error?.error.message;
        this.showError.next(true);
        console.warn(err.error?.error.message);
        this.sendingRequest.next(false);
      },
      () => {
        this.sendingRequest.next(false);
      }
    );
  }
}
