import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
