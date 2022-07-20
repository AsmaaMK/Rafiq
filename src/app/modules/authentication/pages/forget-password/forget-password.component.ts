import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { emailOrUsername } from 'src/app/shared/validators/email-or-username.directive';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      emailOrUserName: new FormControl('', [Validators.required, emailOrUsername()]),
    });
  }

  get emailOrUserName() {
    return this.forgetPassForm.get('emailOrUserName');
  }

  unShowMessage = false;

  send() {
    this.router.navigate(['/auth/resend-link'])
    this.auth.forgetPassword(this.forgetPassForm.value)
      .subscribe(
        res => console.log(res),
        err => console.error(err)
      )
  }
}
