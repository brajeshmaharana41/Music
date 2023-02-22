import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/common/constant';

@Component({
  selector: 'app-selecteduser',
  templateUrl: './selecteduser.component.html',
  styleUrls: ['./selecteduser.component.scss'],
})
export class SelecteduserComponent implements OnInit {
  constructor(private _router$: Router) {}

  ngOnInit(): void {}

  goToBangladeshi() {
    localStorage.setItem(Constants.USERTYPE, '2');
    this._router$.navigate(['auth/signupOrLogin']);
  }
  goToLogin() {
    this._router$.navigate(['auth/login']);
  }
  goToInternational() {
    localStorage.setItem(Constants.USERTYPE, '1');
    this._router$.navigate(['auth/signupOrLogin']);
  }
}
