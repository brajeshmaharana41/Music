import { Component, OnInit } from '@angular/core';
import * as AuthType from '../../type/auth-type';
import { Constants } from '../../common/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  horizontal: boolean = false;
  userInfo: AuthType.BodyUserDataType;
  Constants = Constants;
  constructor(private _router$: Router) {
    this.userInfo = JSON.parse(localStorage.getItem(Constants.LOGGEDINUSER));
  }

  logout() {
    localStorage.clear();
    this._router$.navigate(['/auth']);
  }

  ngOnInit(): void {}
}
