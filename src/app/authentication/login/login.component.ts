import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }

  togglePasswordType() {
    this.fieldTextType = !this.fieldTextType;

    this.seenIconPath = this.fieldTextType
      ? '../../../assets/icons/Seen.svg'
      : '../../../assets/icons/visibility.svg';
  }
}
