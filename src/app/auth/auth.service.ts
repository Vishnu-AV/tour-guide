import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticated: boolean;

  get isUserAuthenticated() {
    return this.userAuthenticated;
  }

  constructor(private router: Router) {
    this.userAuthenticated = true;
  }
  login() {
    this.userAuthenticated = true;
  }
  logout() {
    this.userAuthenticated = false;
    this.router.navigateByUrl('/auth');
  }
}
