import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPassForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get userName() { return this.forgetPassForm.get('userName'); }
  get password() { return this.forgetPassForm.get('password'); }


  onSubmit() {
    console.warn(this.forgetPassForm.value);
  }


}
