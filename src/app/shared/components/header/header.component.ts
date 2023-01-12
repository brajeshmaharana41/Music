import { Component, OnInit } from '@angular/core';
import * as AuthType from '../../type/auth-type';
import { Constants } from '../../common/constant';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  horizontal: boolean = false;
  userInfo: AuthType.BodyUserDataType;
  Constants = Constants;
  constructor(
    private _router$: Router,
    private _commonService$: CommonService
  ) {
    this._commonService$.userUpdated.subscribe((res) => {
      this.userInfo = JSON.parse(localStorage.getItem(Constants.LOGGEDINUSER));
    });
    this._commonService$.userUpdated.next('');
  }

  logout() {
    localStorage.clear();
    this._router$.navigate(['/auth']);
  }

  goToEditProfile() {
    this._router$.navigate(['main/profile-update']);
  }

  ngOnInit(): void {}
}
