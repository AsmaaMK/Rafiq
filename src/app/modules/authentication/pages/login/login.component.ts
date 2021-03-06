import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfoService } from 'src/app/modules/main/modules/profile/services/user-info.service';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
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

  constructor(
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userInfoService: UserInfoService,
    private toasterService: ToasterService
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
        const username = res.results?.user.userName;

        if (refreshToken && accessToken && username) {
          this.tokenStorage.setRefreshToken(refreshToken);
          this.tokenStorage.setAccessToken(accessToken);
          this.tokenStorage.setUserName(username);
          this.userInfoService.myUserName.next(username);
          this.auth.isLoggedIn$.next(true);
        }

        this.sendingRequest.next(false);
        this.router.navigate(['/app/home']);
      },
      (err) => {
        this.toasterService.showToaster('error', err.error?.error.message);
        this.sendingRequest.next(false);
      }
    );
  }
}
