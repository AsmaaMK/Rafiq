import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  passwordType = false;
  confirmPasswordType = false;
  passwordIconPath = '../../../assets/icons/visibility.svg';
  confirmpasswordIconPath = '../../../assets/icons/visibility.svg';

  constructor() {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

  }

  get password() {
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.resetPasswordForm.value);
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
