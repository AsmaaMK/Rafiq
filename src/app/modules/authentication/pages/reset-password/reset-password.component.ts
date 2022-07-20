import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPasswords } from 'src/app/shared/validators/match-passwords.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  passwordType = false;
  confirmPasswordType = false;
  passwordIconPath = '../../../../../assets/auth-module/icons/visibility.svg';
  confirmpasswordIconPath = '../../../../../assets/auth-module/icons/visibility.svg';

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [matchPasswords('password', 'confirmPassword')]
    );
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }


  togglePasswordType() {
    this.passwordType = !this.passwordType;

    this.passwordIconPath = this.passwordType
      ? '../../../../../assets/auth-module/icons/Seen.svg'
      : '../../../../../assets/auth-module/icons/visibility.svg';
  }

  toggleConfirmPasswordType() {
    this.confirmPasswordType = !this.confirmPasswordType;

    this.confirmpasswordIconPath = this.confirmPasswordType
      ? '../../../../../assets/auth-module/icons/Seen.svg'
      : '../../../../../assets/auth-module/icons/visibility.svg';
  }

  passwordShowMessage = false;
  confirmPasswordShowMessage = false;

  resetPassword() {
    const resetToken = this.route.snapshot.paramMap.get('id');
    const password = this.resetPasswordForm.value.password;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword;

    this.router.navigate(['/auth/login']);

    this.auth.resetPassword({ resetToken, password, confirmPassword })
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        err => {
          console.error(err);
        }
      )
  }
}
