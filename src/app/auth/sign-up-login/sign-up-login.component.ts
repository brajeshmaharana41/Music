import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/common/constant';

@Component({
  selector: 'app-sign-up-login',
  templateUrl: './sign-up-login.component.html',
  styleUrls: ['./sign-up-login.component.scss'],
})
export class SignUpLoginComponent implements OnInit {
  userType: string; //1 for international and 2 for bangladeshi.
  constructor(private _router$: Router) {
    this.userType = localStorage.getItem(Constants.USERTYPE);
  }

  ngOnInit(): void {}
  goToSignUP() {
    if (this.userType === '1') {
      this._router$.navigate(['auth/signupEmail/1']);
    } else {
      this._router$.navigate(['auth/login/1']);
    }
  }
  goToLogin() {
    if (this.userType === '1') {
      this._router$.navigate(['auth/signupEmail/2']);
    } else {
      this._router$.navigate(['auth/login/2']);
    }
  }
}
