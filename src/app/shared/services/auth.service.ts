import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const remotehost = 'https://62113b5701ccdac0741f933a.mockapi.io';
const localhost = 'http://localhost:3000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${localhost}/api/v1/auth`;

  constructor(private http: HttpClient) { }

  registerUser(body: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${this.url}/register`, body, httpOptions);
  }

  loginUser(body: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/login`, body, httpOptions);
  }

  forgetPassword(body: ForgotPasswordRequest) {
    return this.http.post<null>(`${this.url}/forgotPassword`, body, httpOptions);
  }

  resetPassword(body: ResetPasswordRequest) {
    return this.http.put<ResetPasswordResponse>(`${this.url}/resetPassword`, body, httpOptions);
  }

  getAccessToken() {
    return this.http.post(`${this.url}/accessToken`, {
      'refreshToken': localStorage.getItem('refreshToken') 
    }, httpOptions);
  }

  isLogedIn() {
    return !!localStorage.getItem('refreshToken');
  }
}


type RegisterRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
  dateOfBirth: string;
};

type RegisterResponse = {
  success: boolean;
  results?: {
    message: string;
    user: {
      userName: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    statusCode: number;
    message: string;
  };
};

type LoginRequest = {
  emailOrUserName: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  results?: {
    message: string;
    user: {
      userName: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    statusCode: number;
    message: string;
  };
};

type ForgotPasswordRequest = {
  emailOrUserName: string;
};

type ResetPasswordRequest = {
  resetToken: string | null;
  password: string;
  confirmPassword: string;
};

type ResetPasswordResponse = {
  success: boolean;
  results?: {
    message: string;
  };
  error?: {
    statusCode: number;
    message: string;
  };
};
