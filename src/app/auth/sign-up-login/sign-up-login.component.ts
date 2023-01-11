import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-login',
  templateUrl: './sign-up-login.component.html',
  styleUrls: ['./sign-up-login.component.scss']
})
export class SignUpLoginComponent implements OnInit {

  constructor( private _router$: Router) { }

  ngOnInit(): void {
  }
  goToSignUPEmail() {
    this._router$.navigate(['auth/signupEmail']);
  }
  goToLoginEmail() {
    this._router$.navigate(['auth/LoginEmail']);
  }
}
