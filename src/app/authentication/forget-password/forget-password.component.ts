import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailOrUsername } from 'src/app/shared/validators/email-or-username.directive';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      userName: new FormControl('', [Validators.required, emailOrUsername()]),
    });
  }

  get userName() {
    return this.forgetPassForm.get('userName');
  }

  onSubmit() {
    console.warn(this.forgetPassForm.value);
  }

  unShowMessage = false;
}
