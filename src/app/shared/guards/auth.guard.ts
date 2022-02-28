import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  
  canActivate(): boolean {
    if (this.auth.isLoggedIn$.value) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
  
}
