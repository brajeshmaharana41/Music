import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import * as CommonType from '../../shared/type/common-type';
import * as AuthType from '../../shared/type/auth-type';
import { Constants } from '../../shared/common/constant';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  otp: FormControl;
  hide = true;
  loginstatus = false;
  ShowRoomId: any;
  constructor(
    private _router: Router,
    private _mainService$: MainService,
    private _authService$: AuthService
  ) {}

  ngOnInit(): void {
    this.otp = new FormControl('1234', [Validators.required]);
  }
  onClickSubmit() {
    console.log(this.otp.value, 'hI');
    if (this.otp && this.otp.valid) {
      this.verifyOTPAPI(this._authService$.otpPhone, this.otp.value);
    }
  }

  verifyOTPAPI(otpPhone: string, otp: string) {
    this._mainService$.otpVerification(otpPhone, otp).subscribe({
      next: (res: AuthType.LoginResponseType) => {
        if (res && res.status === Constants.SUCCESSSTATUSCODE) {
          localStorage.setItem(Constants.SESSIONTOKENSTRING, res.body.token);
          localStorage.setItem(
            Constants.LOGGEDINUSER,
            JSON.stringify(res.body.user_data)
          );
          localStorage.setItem(Constants.LOGGEDINUSERID, res.body.user_id);
          this._router.navigate(['main/home']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }
}
