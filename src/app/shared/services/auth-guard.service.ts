import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Constants } from '../common/constant';

@Injectable({ providedIn: 'root' })
export class AuthTokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: any;
    console.log(state.url);
    try {
      token = localStorage.getItem(Constants.SESSIONTOKENSTRING);
    } catch (e) {
      console.log(e);
    }
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class NoAuthTokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: any;
    console.log(state.url);
    try {
      token = localStorage.getItem(Constants.SESSIONTOKENSTRING);
    } catch (e) {
      console.log(e);
    }
    if (token) {
      this.router.navigate(['/main']);
      return false;
    } else {
      return true;
    }
  }
}
